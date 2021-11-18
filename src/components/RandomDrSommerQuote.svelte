<script>
    const quotes = [
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen01.png',
            quote: 'Was ist denn daran so schlimm? Dieter Bohlen hatte einst einen Vertrag mit adidas und musste deshalb jahrelang Ballonseide tragen. Das nenne ich erst grausam!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen02.png',
            quote: 'Tja, mein Lieber, Pech gehabt! Wären es jetzt \'Schwarze Trüffel\', könntest Du echt noch \'n paar Euro machen, denn die sind sauteuer. Also, nichts für ungut aber nächstes Mal passt Du halt mal besser auf, wo und vor allem mit was Du Dich ansteckst...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen03.png',
            quote: 'Seit Boris Beckers Nummer in der Kleiderkammer wissen wir ja nun alle, dass man auch beim Oralverkehr schwanger werden kann. Also, mein Tipp: Badewasser immer schön ablaufen lassen. Keinesfalls versuchen, die Badewanne leerzutrinken!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen04.png',
            quote: 'Mit der Zeit wird sich bei Dir wohl die Erkenntnis durchsetzen müssen, dass man mit einem Zahnstocher beim besten Willen nun mal keine Sahne schlagen kann. Je früher Du das ehrlich einsiehst, desto besser für Dich und die gesamte Damenwelt!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen05.png',
            quote: 'Nein, aber Rückenmarksschwindsucht, schlechte Zähne und vor allem krumme Finger! Dafür soll es aber bei besonders intensiver Masturbation einen schönen, schlanken Fuß machen...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen06.png',
            quote: 'Aber Hallo! Oder was glaubst Du, warum FKK in der ehemaligen DDR solch ein Volkssport war?!? Abends gab\'s dann nach Broiler und Griller Ringelpietz mit Anfassen. Und das mit dem Anfassen gestaltet sich bei den Nackerten ja ansonsten recht schwierig...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen07.png',
            quote: 'Kann man so nicht eindeutig beantworten. Aber neuerdings soll es bei der Bundeswehr ja auch weibliches medizinisches Personal geben, ha, ha! Ansonsten probier\'s mal mit der biblischen Regel: "Wie Du mir, so ich Dir!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen08.png',
            quote: 'Leider kann ich Dir bei Deinem Problem wenig helfen. Aber ich hätte da was für Dich: Für den bunten Abend auf unserem nächsten Ärztekongress suchen wir noch \'ne Pausennummer. Vielleicht hinterlässt Du mal Anschrift und Telefon-Nummer in der Redaktion. Danke!\n' +
                'P.S.: Gibt auch \'ne kleine Gage!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen09.png',
            quote: 'Igitt! Alleine beim Gedanken daran schaudert\'s mich. Da ich beruflich viel unterwegs bin, zwingt mich meine Blasenschwäche oft zu Zwischenstops an BAB-Dixi-Klos. Ich hasse es, bis zu den Knöcheln im Urin zu waten, nur weil Ferkel wie Du, genau das nämlich probiert haben. Pfui Deibel!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen12.png',
            quote: 'Dann frag doch mal jemanden aus Deiner Familie. Irgendeiner wird sie wohl verlegt haben. Und das nächste mal passt Du halt besser auf, bevor Du Teile von Dir verleihst...\t'
        },
        {image: 'https://www.bravo-archiv.de/png/drsommerfragen13.png', quote: 'Wieso nur zweimal?'},
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen21.png',
            quote: 'Das darfst Du Dir auf keinen Fall bieten lassen! Wo kommen wir denn da hin, wenn wir uns waschen, nur weil wir eine Freundin haben?!?'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen22.png',
            quote: 'NEIN! Es sei denn, Du willst dir \'n paar Tipps zur gesunden Ernährung, zum Thema \'Schlank durch Sport\' oder generell zum schnelleren Abnehmen geben lassen.'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen23.png', quote:
                'Das ist absolut ok! Natrlich nur, solange Du nichts bekleckerst und danach die Sachen wieder fein säuberlich zurück in den Schrank hängst.\n' +
                '\n' +
                'Ach ja, Belegfoto für unsere Pin-Wand wäre ganz nett...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen24.png',
            quote: 'Das kommt davon, dass Du immer damit rumspielst (oder rumspielen lässt) und Dir die Dinger bis über die Ohren ziehst. Es gäbe da natürlich auch noch \'ne einfachere Erklärung: Dein Rock ist zu kurz...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen25.png',
            quote: 'Mach Dir darüber mal keine Gedanken. Wahrscheinlich hat er nur etwas Kleingeld gesucht um in der BRAVO nachzulesen ob Du ihn verpetzt hast!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen26.png',
            quote: 'Zwar weiß hier niemand so genau, was Oralsex ist, wenn es aber das ist, was wir denken, jawohl, dann ist es pervers!!!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen27.png',
            quote: 'Nein! Die gehören eindeutig an die Füße oder in den Schrank! In den BH gehören Möpse und Männerhände!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen28.png',
            quote: 'Dann steht Euch die Welt offen für eine Karriere als Rapper, Comedy-Star oder\n' +
                'im Dr. Sommer Team. Schickt doch mal\n' +
                '\'ne Bewerbung!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen31.png',
            quote: 'Da es DIE Dusche heißt, ist dieses Teil wohl eindeutig weiblich, also eine Schwangerschaft eigentlich ausgeschlossen. Solltest Du aber für Deine Spielchen das Baumarkt - Billig - Modell eines asiatischen Herstellers verwenden, empfehle ich dringendst, mal den Rat eines Gas - Wasser - Installateurs einzuholen. Adressen gibt\'s bei der Innung.'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen33.png',
            quote: 'Tja, mein Lieber, das altbewährte \'Mütze - Glatze - Spielchen\' kannst Du Dir jetzt wohl abschminken. Trotzdem musst Du nicht gleich aufgeben. Probier\'s mal mit den Heizungsrippen...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen30.png',
            quote: 'Wir haben den Versuch in der Redaktion mehrfach nachgestellt. Leider trat bei niemandem der Kollegen das gleiche Phänomen auf, so daß wir Dir hier leider auch nicht weiterhelfen können...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen50.png',
            quote: 'Solange Du nicht von vorne so aussiehst, dass sich gleich die Kameraobjektive verbiegen, kannst Du immer noch in die Politik oder zum Fernsehen gehen. Da wimmelt\'s vor lauter Menschen ohne Profil...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen51.png',
            quote: 'Tja, lieber Klaus-Dieter, da haste jetzt aber was angefangen! Unser Tipp: Wenn Du es schon nicht sein lassen kannst - oder gar die Sachen Deiner älteren Schwester auftragen musst - dann zieh\' wenigstens nen dicken Pulli über. Muss ja nicht jeder gleich sehen, was für\'n Perverser Du bist!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen52.png',
            quote: 'Das weiß doch jedes Kind: Erst Türe abschließen und dann erst GIB IHM! Und wenn Du schon erwischt wirst, dann solltest Du wenigstens eine gute Ausrede parat haben. Zum Beispiel: Mein Arzt hat mir dazu geraten, um mein Fieber zu senken! Oder: Ich muss bis Weihnachten das Glas voll machen, sonst bekomme ich kein neues Fahrrad...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen53.png',
            quote: 'Wie, gegen Deinen Willen? Was bist denn Du für \'ne Pupe? Und wenn Du mit dem heißen Feger nichts anzufangen weißt, dann fahr\' sie wenigstens bei uns vor die Türe. Alles Weitere regeln wir dann schon, Du Schwachkopf!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen54.png',
            quote: 'Dein Problem ist schnell gelöst. Bevor Du das nächste Mal an die Tafel gerufen wirst, einfach die Hose wieder hochziehen! Und wenn das nicht so schnell klappt, sagst Du einfach, dass Dich binomische Formeln unheimlich scharf machen. Das gibt Punkte bei der Lehrerin!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen55.png',
            quote: 'Lass sie ruhig lachen! In ein paar Jahren bist Du entweder gutbezahlte Moderatorin bei Neun Live, gehst ins Dschungel-Camp oder heiratest irgend einen tumben Playboy aus Düsseldorf, der MP3-Player verscherbelt. Es sei denn, Du hast noch mehr zu bieten. Dann wird\'s natürlich etwas schwieriger mit \'ner Karriere.'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen56.png',
            quote: 'Das ist völlig okay, solange Du wieder alles sauber machst, sobald Du fertig bist. Denn Deine Kollegen wollen ja auch noch...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen57.png',
            quote: 'Dann biete doch in der Weihnachtszeit mal bei der Volkshochschule einen Kurs an. Thema: So ziehe ich Kerzen selbst. Auf die Resonanz sind wir jetzt schon ganz gespannt.\t'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen58.png',
            quote: 'Kurze Zwischenfrage bevor wir Dir die Frage abschließend beantworten können: An welcher Stelle genau hast Du denn gerochen?'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen59.png',
            quote: 'Leider schreibst Du nicht, welcherlei Geschlechts Du bist. Bist Du ein Mädchen, so ist Deine Sehnsucht völlig normal. Bist Du aber ein Junge, so ist Dein Verlangen einfach ekelhaft!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen60.png',
            quote: 'Das kommt darauf an, wofür Du es benutzen willst. Wenn Du es nur dafür nimmst, wofür es auch vorgesehen ist, so wird\'s wohl richtig funktionieren. Solltest Du aber versuchen, damit eine Glühbirne einzuschrauben oder ein Pferd zu satteln, so wirst Du mit ziemlicher Sicherheit auf einige Probleme stoßen.'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen61.png',
            quote: 'Halte Dich an das biblische Wort: Wenn einer Dir in den linken Hoden tritt, so halte ihm auch Deinen rechten Hoden hin. Auf die Art und Weise kannst Du auch den Schmerz etwas besser im Gleichgewicht halten.'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen62.png',
            quote: 'Nu komm schon! In Wahrheit hast Du nur so\'n kleines Lümmelchen und willst hier groß auf die Pauke hauen, weil Du denkst, wir könnten das von hier aus nicht kontrollieren. Aber Pustekuchen! Aus Versehen hast Du auf der Rückseite die Nummer Deiner Freundin notiert. Und da rufen wir doch gleich mal an...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen63.png',
            quote: 'Gegenfrage: Wohin sollten sie denn abstehen. Oder meinst Du etwa im Sinne von \'abstehenden Ohren\'? Na das sähe vielleicht bescheuert aus!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen64.png',
            quote: 'Und daran wird sich wohl auch für den Rest Deines Lebens wenig ändern! Also heißt es für Dich: Viel Kohle machen! Dann laufen Dir die Weiber scharenweise nach. Und von wegen "Hauptsache, er hat Humor!" Das ist nur eine Legende!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen65.png',
            quote: 'Eindeutig JA! Ansonsten würdest Du keine Briefe an Dr. Sommer schreiben! Tut mir leid!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen66.png',
            quote: 'Noch so\'n Angeber! Aber vorsichtig! Wahrscheinlich haben sie nicht die Größe gemeint, sondern den Reinlichkeitszustand Deines besten Teils!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen67.png',
            quote: 'Und wahrscheinlich auch noch brennende Augen vom Chlor, weil Du unter Wasser immer die Augen aufmachst um den Mädels auf die String-Tangas zu stieren. Schäm Dich!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen68.png',
            quote: 'Das hast Du Dir wahrscheinlich selbst zuzuschreiben, weil Du vorher mal wieder geprahlt hast, wieviele \'Weiber\' Du schon \'flachgelegt hast\'! Und dann, als es drauf ankam, war tote Hose, wa?!? Also, wir finden, mit \'ner Ohrfeige bist Du eigentlich zu gut weggekommen...'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen69.png',
            quote: 'Zwar kennt hier keiner Dracula, aber wir haben abends eher Angst davor, beim Rumzappen im Fernsehen auf Johannes B. Kerner, Frank Elstner oder Dirk Bach zu treffen. Das bereitet uns Albträume!!!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen70.png',
            quote: 'Da gibt\'s \'ne ganz einfache Lösung: Einfach sein lassen mit dem Waschen! Und wenn\'s unerträglich wird für Deine Umwelt wegen des Geruchs, dann mach Dich selbständig als Fischhändler!'
        },
        {
            image: 'https://www.bravo-archiv.de/png/drsommerfragen71.png',
            quote: 'Das ist böse! Wir sehen Dich schon nächtelang über denn Sinn des Lebens, über den Beitritt Chinas in die EU oder das Schmelzen der Polarkappen diskutieren. Da wir davon ausgehen, dass Du Einfaltspinsel doch eher was Solides zum Rammeln suchst, raten wir Dir: Such\' Dir ein Mädel aus der Baum-, Fahr- oder Volkshochschule. Die wissen, wo\'s langgeht!'
        },
    ]

    const wednesdayFrogs = ['https://preview.redd.it/cwc87eeqfry71.jpg?width=640&crop=smart&auto=webp&s=5bad1ebe0fe7f1562358d6c83fce7df129c915a7', 'https://preview.redd.it/9bfjl16yu3081.jpg?width=640&crop=smart&auto=webp&s=72b80b7e5df185c85b8a57c002a05ab195095779', 'https://preview.redd.it/ta6vfnmy3qy71.jpg?width=640&crop=smart&auto=webp&s=e140a1527a4e5cb03d14efc577bfcaad4e912885', 'https://preview.redd.it/82ebsegw1qy71.jpg?width=640&crop=smart&auto=webp&s=b637add1085030c93d85c35647123d666313e42c', 'https://preview.redd.it/r2jg3bznxpy71.jpg?width=640&crop=smart&auto=webp&s=c5ed6741cedf560da1c2c35f3078763ca5bf66ce', 'https://preview.redd.it/o2fthbciupy71.jpg?width=640&crop=smart&auto=webp&s=3d8c06f2138c104a20e52a8c295ed61f9463d991', 'https://i.redd.it/90k060kirpy71.jpg', 'https://preview.redd.it/bucu0lhgqpy71.jpg?width=640&crop=smart&auto=webp&s=b607203a99419aa08ca6b21bfba02c8d1c726262']
    const loveStories = ['https://scontent.xx.fbcdn.net/v/t1.18169-9/p480x480/23843468_1299851556787415_8532340477491887243_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8024bb&_nc_ohc=rZ_hjBLsBQkAX8kq-KD&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=13f15c0b53413c2448e2060cfedc8ccc&oe=61BA996F', 'https://scontent.xx.fbcdn.net/v/t1.18169-9/p526x296/23517823_1292937840812120_2918264683676889834_n.png?_nc_cat=109&ccb=1-5&_nc_sid=8024bb&_nc_ohc=V9uIcFcg-mUAX_Eu4BC&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=a7d4ca4ce4dfc99554d315a9ce17da1a&oe=61B91C32', 'https://scontent.xx.fbcdn.net/v/t31.18172-8/p526x296/23405862_1285349394904298_4751014267498138739_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=110474&_nc_ohc=_S7jlhImT0kAX8__hgM&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=8e6b6141a5301f381e609aa16766947d&oe=61B9D096', 'https://scontent.xx.fbcdn.net/v/t1.18169-9/p480x480/17800240_1088015984637641_3188053084388986633_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=FGPY7hvin7AAX_VPl5E&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=8d6bac35de9897c4e5eaa2f0a1d53e8f&oe=61B9DA95', 'https://scontent.xx.fbcdn.net/v/t31.18172-8/p526x296/20507010_1193752607397311_8814776545282610656_o.jpg?_nc_cat=100&ccb=1-5&_nc_sid=110474&_nc_ohc=aXi_5_TEc5AAX-ued4W&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=23e037346fd19ca6304de43d7a732792&oe=61B92691', 'https://scontent.xx.fbcdn.net/v/t31.18172-8/p480x480/20369516_1187016351404270_4727021367896495267_o.jpg?_nc_cat=110&ccb=1-5&_nc_sid=110474&_nc_ohc=CTbhePavHwMAX9UFtzN&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=2d3952390f60cda1025a2ea2a6ec1f26&oe=61B94004', 'https://scontent.xx.fbcdn.net/v/t31.18172-8/p350x350/18953282_1138035532969019_2233222995441310878_o.jpg?_nc_cat=105&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=pgLB85E5n8EAX9c6iPp&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=583bcee80afd3363a5203f40acccb01f&oe=61BAAF23', 'https://scontent.xx.fbcdn.net/v/t1.18169-9/18519781_1125242540914985_3056759040083960700_n.png?_nc_cat=100&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=Se8xhcN_DOwAX-u7PRl&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=d4d0fbd1722adeaa00af110343623105&oe=61B9AE17', 'https://scontent.xx.fbcdn.net/v/t1.18169-9/18557085_1123468447759061_1693062798056630309_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=2d5d41&_nc_ohc=7TUtn92zFFQAX8Q1DkF&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=6eb9670f64115d58d973bc198205d95b&oe=61BAB671', 'https://scontent.xx.fbcdn.net/v/t1.18169-9/24774894_1310874795685091_6152009818185414321_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8024bb&_nc_ohc=I7ecFRK3jaoAX_O6F8a&_nc_ht=scontent.xx&edm=ALklZ1YEAAAA&oh=7cb6fb9cf3e33c0a566903cacbac1d63&oe=61B9FDEA']

    const today = new Date()
    const itsWednesdayMyDudes = today.getDay() === 3
    const length = itsWednesdayMyDudes ? wednesdayFrogs.length : quotes.length

    let randomIndex
    let nextIndex
    let isLoveStory = false

    const next = () => {
        isLoveStory = false
        nextIndex = (nextIndex + 1) % length
    }

    const randomQuote = () => {
        isLoveStory = false
        nextIndex = Math.floor(Math.random() * length)
    }

    const randomLoveStory = () => {
        isLoveStory = true
        nextIndex = Math.floor(Math.random() * loveStories.length)
    }

    randomQuote()
</script>

<style>
    p {
        width: 500px;
        max-width: 500px;
        display: inline-block;
    }
</style>

<button on:click={next}>next quote</button>
<button on:click={randomQuote}>random quote</button>
<button on:click={randomLoveStory}>random love story</button>


{#if isLoveStory}
    <div>
        <img src={loveStories[nextIndex]} alt=""/>
    </div>
{:else if itsWednesdayMyDudes}
    <div>
        <img src={wednesdayFrogs[nextIndex]} alt=""/>
    </div>
{:else}
    <div>
        <img src={quotes[nextIndex].image} alt=""/>
    </div>
    <p>
        <b>Dr. Sommer antwortet:</b>
    </p>
    <br>
    <p>
        {quotes[nextIndex].quote}
    </p>
{/if}


