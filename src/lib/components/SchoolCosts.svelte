<script lang="ts">
    import rawCsv from '../data/school_costs.csv?raw'
    import { parseSchoolCosts, defaultSchoolYear, computeSpanCost, GRADE_KEYS, GRADE_LABELS } from '../utils/csv-parser'
    import type { SchoolCostRow, GradeKey } from '../utils/csv-parser'

    const SCHOOL_NAMES: Record<string, string> = {
        bcis: 'BCIS',
        bisp: 'BISP',
        finnway: 'Finnway',
        headstart: 'Headstart',
        isp: 'ISP',
        kisp: 'KISP',
        lighthouse: 'Lighthouse',
        oak: 'Oak',
    }

    const allRows = parseSchoolCosts(rawCsv)
    const allSchools = [...new Set(allRows.map(r => r.school))].sort()
    const allYears = [...new Set(allRows.map(r => r.year))].sort()

    let selectedSchools = $state(new Set<string>(allSchools))
    let selectedYears = $state(new Set<string>([defaultSchoolYear(allYears)]))
    let showFullGrades = $state(false)
    let sortBy = $state<'school' | 'year' | 'span'>('year')
    let sortAsc = $state(true)
    let spanFrom = $state<GradeKey>('preK')
    let spanTo = $state<GradeKey>('k2')
    let extraMonthly = $state<Record<string, number>>({})
    let waivedEntFees = $state(new Set<string>())

    const spanStats = $derived.by(() => {
        const stats = new Map<string, { min: number; max: number }>()
        for (const year of allYears) {
            const vals = allRows
                .filter(r => r.year === year)
                .map(r => computeSpanCost(r, spanFrom, spanTo, extraMonthly[r.school] ?? 0, !waivedEntFees.has(r.school)))
                .filter((v): v is number => v !== null)
            if (vals.length > 1) stats.set(year, { min: Math.min(...vals), max: Math.max(...vals) })
        }
        return stats
    })

    const filteredRows = $derived.by(() => {
        const rows = allRows.filter(r => selectedSchools.has(r.school) && selectedYears.has(r.year))
        return rows.sort((a, b) => {
            let cmp = 0
            if (sortBy === 'school') cmp = a.school.localeCompare(b.school)
            else if (sortBy === 'year') cmp = a.year.localeCompare(b.year) || a.school.localeCompare(b.school)
            else {
                const sa = computeSpanCost(a, spanFrom, spanTo, extraMonthly[a.school] ?? 0, !waivedEntFees.has(a.school)) ?? Infinity
                const sb = computeSpanCost(b, spanFrom, spanTo, extraMonthly[b.school] ?? 0, !waivedEntFees.has(b.school)) ?? Infinity
                cmp = sa - sb
            }
            return sortAsc ? cmp : -cmp
        })
    })

    function toggleSchool(school: string) {
        const next = new Set(selectedSchools)
        if (next.has(school)) next.delete(school)
        else next.add(school)
        selectedSchools = next
    }

    function toggleYear(year: string) {
        const next = new Set(selectedYears)
        if (next.has(year)) next.delete(year)
        else next.add(year)
        selectedYears = next
    }

    function setSort(col: 'school' | 'year' | 'span') {
        if (sortBy === col) sortAsc = !sortAsc
        else { sortBy = col; sortAsc = true }
    }

    function fmt(val: number | null): string {
        return val === null ? '—' : val.toLocaleString()
    }

    function formatYear(year: string): string {
        return `20${year}`
    }

    function sortArrow(col: 'school' | 'year' | 'span'): string {
        if (sortBy !== col) return ''
        return sortAsc ? ' ↑' : ' ↓'
    }

    // Interpolate through green → yellow → orange → red stops
    function interpolateColor(t: number): string {
        const stops: [number, number, number][] = [
            [166, 227, 161], // #a6e3a1 green
            [249, 226, 175], // #f9e2af yellow
            [250, 179, 135], // #fab387 peach/orange
            [243, 139, 168], // #f38ba8 red
        ]
        const n = stops.length - 1
        const i = Math.min(Math.floor(t * n), n - 1)
        const lt = t * n - i
        const [r1, g1, b1] = stops[i]
        const [r2, g2, b2] = stops[i + 1]
        return `rgba(${Math.round(r1 + (r2 - r1) * lt)}, ${Math.round(g1 + (g2 - g1) * lt)}, ${Math.round(b1 + (b2 - b1) * lt)}, 0.35)`
    }

    function spanColor(row: SchoolCostRow): string {
        const val = computeSpanCost(row, spanFrom, spanTo, extraMonthly[row.school] ?? 0, !waivedEntFees.has(row.school))
        if (val === null) return ''
        const stats = spanStats.get(row.year)
        if (!stats || stats.min === stats.max) return ''
        return interpolateColor((val - stats.min) / (stats.max - stats.min))
    }
</script>

<div class="filters">
    <div class="filter-group">
        <span class="filter-label">Schools</span>
        <div class="chips">
            {#each allSchools as school}
                <button
                    class="chip"
                    class:active={selectedSchools.has(school)}
                    onclick={() => toggleSchool(school)}
                >
                    {SCHOOL_NAMES[school] ?? school}
                </button>
            {/each}
        </div>
    </div>

    <div class="filter-group">
        <span class="filter-label">Years</span>
        <div class="chips">
            {#each allYears as year}
                <button
                    class="chip"
                    class:active={selectedYears.has(year)}
                    onclick={() => toggleYear(year)}
                >
                    {formatYear(year)}
                </button>
            {/each}
        </div>
    </div>

    <div class="filter-group">
        <span class="filter-label">View</span>
        <div class="chips">
            <button class="chip" class:active={!showFullGrades} onclick={() => (showFullGrades = false)}>Overview</button>
            <button class="chip" class:active={showFullGrades} onclick={() => (showFullGrades = true)}>All Grades</button>
        </div>
    </div>

    <div class="filter-group">
        <span class="filter-label">Span</span>
        <div class="span-selects">
            <select bind:value={spanFrom}>
                {#each GRADE_KEYS as grade}
                    <option value={grade}>{GRADE_LABELS[grade]}</option>
                {/each}
            </select>
            <span class="span-arrow">→</span>
            <select bind:value={spanTo}>
                {#each GRADE_KEYS as grade}
                    <option value={grade}>{GRADE_LABELS[grade]}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="filter-group">
        <span class="filter-label">Ent. Fee</span>
        <div class="chips">
            {#each [...selectedSchools].sort() as school}
                <button
                    class="chip"
                    class:active={!waivedEntFees.has(school)}
                    onclick={() => {
                        const next = new Set(waivedEntFees)
                        if (next.has(school)) next.delete(school)
                        else next.add(school)
                        waivedEntFees = next
                    }}
                >
                    {SCHOOL_NAMES[school] ?? school}
                </button>
            {/each}
        </div>
    </div>

    <div class="filter-group">
        <span class="filter-label">Rent +/mo</span>
        <div class="rent-inputs">
            {#each [...selectedSchools].sort() as school}
                <label class="rent-input">
                    <span class="rent-label">{SCHOOL_NAMES[school] ?? school}</span>
                    <input
                        type="number"
                        min="0"
                        step="100"
                        value={extraMonthly[school] ?? 0}
                        oninput={e => {
                            const v = Number((e.target as HTMLInputElement).value)
                            extraMonthly = { ...extraMonthly, [school]: isNaN(v) ? 0 : v }
                        }}
                    />
                </label>
            {/each}
        </div>
    </div>
</div>

<div class="table-wrap">
    <table>
        <thead>
            <tr>
                <th class="sortable left" onclick={() => setSort('school')}>School{sortArrow('school')}</th>
                <th class="sortable left" onclick={() => setSort('year')}>Year{sortArrow('year')}</th>
                <th>App Fee</th>
                <th>Ent Fee</th>
                <th>Deposit</th>
                {#if showFullGrades}
                    <th>Pre-K</th>
                    <th>K1</th>
                    <th>K2</th>
                    <th>K3</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                {/if}
                <th class="sortable span-head" onclick={() => setSort('span')}>{GRADE_LABELS[spanFrom]} → {GRADE_LABELS[spanTo]}{sortArrow('span')}</th>
            </tr>
        </thead>
        <tbody>
            {#each filteredRows as row}
                <tr>
                    <td class="school-name">{SCHOOL_NAMES[row.school] ?? row.school}</td>
                    <td class="year-cell">{formatYear(row.year)}</td>
                    <td>{fmt(row.appFee)}</td>
                    <td>{fmt(row.entFee)}</td>
                    <td>{fmt(row.deposit)}</td>
                    {#if showFullGrades}
                        <td>{fmt(row.preK)}</td>
                        <td>{fmt(row.k1)}</td>
                        <td>{fmt(row.k2)}</td>
                        <td>{fmt(row.k3)}</td>
                        <td>{fmt(row.g1)}</td>
                        <td>{fmt(row.g2)}</td>
                        <td>{fmt(row.g3)}</td>
                        <td>{fmt(row.g4)}</td>
                        <td>{fmt(row.g5)}</td>
                        <td>{fmt(row.g6)}</td>
                        <td>{fmt(row.g7)}</td>
                        <td>{fmt(row.g8)}</td>
                        <td>{fmt(row.g9)}</td>
                        <td>{fmt(row.g10)}</td>
                        <td>{fmt(row.g11)}</td>
                        <td>{fmt(row.g12)}</td>
                    {/if}
                    <td class="span-cell" style="background-color: {spanColor(row)}">
                        {fmt(computeSpanCost(row, spanFrom, spanTo, extraMonthly[row.school] ?? 0, !waivedEntFees.has(row.school)))}
                        {#if row.deposit !== null}
                            <span class="deposit-note">deposit {fmt(row.deposit)}</span>
                        {/if}
                    </td>
                </tr>
            {/each}
            {#if filteredRows.length === 0}
                <tr>
                    <td colspan="6" class="empty">No data for the selected filters.</td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style>
    .filters {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-bottom: 1.25rem;
    }

    .filter-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .filter-label {
        color: #6c7086;
        font-size: 0.82rem;
        min-width: 4rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .chips {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
    }

    .chip {
        padding: 0.2rem 0.65rem;
        border-radius: 999px;
        border: 1px solid #45475a;
        background: transparent;
        color: #6c7086;
        cursor: pointer;
        font-size: 0.82rem;
        transition: border-color 0.15s, color 0.15s, background 0.15s;
        font-family: inherit;
    }

    .chip:hover {
        border-color: #89b4fa;
        color: #cdd6f4;
    }

    .chip.active {
        background: #313244;
        border-color: #89b4fa;
        color: #cdd6f4;
    }

    .table-wrap {
        overflow-x: auto;
        border-radius: 6px;
        border: 1px solid #313244;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        font-size: 0.875rem;
    }

    thead th {
        background: #181825;
        color: #6c7086;
        padding: 0.55rem 0.8rem;
        text-align: right;
        font-weight: 500;
        white-space: nowrap;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #313244;
    }

    thead th.left {
        text-align: left;
    }

    thead th.sortable {
        cursor: pointer;
        user-select: none;
    }

    thead th.sortable:hover {
        color: #cdd6f4;
    }

    thead th.span-head {
        color: #cba6f7;
        border-left: 2px solid #45475a;
    }

    tbody tr {
        border-bottom: 1px solid #313244;
        transition: background 0.1s;
    }

    tbody tr:last-child {
        border-bottom: none;
    }

    tbody tr:hover td {
        background: #313244;
    }

    /* Prevent hover from overriding cost color on colored cells */
    tbody tr:hover td.span-cell {
        filter: brightness(1.15);
    }

    tbody td {
        padding: 0.45rem 0.8rem;
        color: #cdd6f4;
        text-align: right;
        white-space: nowrap;
        background: transparent;
    }

    td.school-name {
        text-align: left;
        font-weight: 600;
        color: #89b4fa;
    }

    td.year-cell {
        text-align: left;
        color: #a6adc8;
    }

    td.span-cell {
        border-left: 2px solid #45475a;
        font-weight: 700;
        color: #cdd6f4;
        transition: filter 0.1s;
    }

    .deposit-note {
        display: block;
        font-size: 0.7rem;
        font-weight: 400;
        color: #a6adc8;
        line-height: 1.2;
    }

    td.empty {
        text-align: center;
        color: #6c7086;
        padding: 2rem;
    }

    .span-selects {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .span-selects select {
        background: #313244;
        border: 1px solid #45475a;
        color: #cdd6f4;
        border-radius: 6px;
        padding: 0.2rem 0.5rem;
        font-size: 0.82rem;
        font-family: inherit;
        cursor: pointer;
    }

    .span-selects select:hover {
        border-color: #89b4fa;
    }

    .span-arrow {
        color: #6c7086;
        font-size: 0.82rem;
    }

    .rent-inputs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .rent-input {
        display: flex;
        align-items: center;
        gap: 0.35rem;
        background: #313244;
        border: 1px solid #45475a;
        border-radius: 6px;
        padding: 0.2rem 0.5rem;
        font-size: 0.82rem;
    }

    .rent-label {
        color: #6c7086;
        white-space: nowrap;
    }

    .rent-input input {
        width: 5rem;
        background: transparent;
        border: none;
        border-bottom: 1px solid #45475a;
        color: #cdd6f4;
        font-size: 0.82rem;
        font-family: inherit;
        text-align: right;
        outline: none;
    }

    .rent-input input:focus {
        border-bottom-color: #89b4fa;
    }
</style>
