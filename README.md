# Programmeerproject - README
### Jelle Mul
### 11402148

Het bedrijf Peerby Go is een bedrijf dat mensen de mogelijkheid biedt om spullen huren en te verhuren. Hierbij fungeren zij als tussenpersoon en mogelijk als bezorgdienst. De visualisatie richt op het schetsen van een beeld welke transacties plaatsvinden, met welke type product en in welke hoeveelheid. Voor Peerby Go is het van belang om het aantal transacties te verhogen aangezien hun verdienmodel op is gebasseerd. Deze visualisatie geeft hen een beeld van het aantal transacties, in welke categorie deze transacties vallen en tot slot op welke locatie deze transacties plaatsvinden.

### De visualisaties
Bij het laden van de pagina wordt de data opgehaald. Hierin staat voor de te bezorgen producten de vertrektijd gegeven met daarbij de lengte en breedtegraad, en de lengte en breedtegraad van het aankomstpunt. De visualisatie bevat een virtuele time stamp. Wanneer de tijd verstrijkt en het vertrekpunt van een product wordt bereikt is op de kaart "live" te zien hoe de bezorger vertrekt en in de loop van de tijd zijn bestemming bereikt. Hier mee kan dus "realtime" van verschillende transactie de voorspelde route van de bezorger worden weergegeven. Deze kaart is voornamelijk interresant als reclame methode om mensen inzicht te geven in het aantal transacties in de buurt wat hun door de visuele aantrekkelijkheid aanspoort om ook de dienst te gebruiken

Naast de kaart is het interessant om te zien welk type producten worden gehuurd. Met behulp van een 2de dataset kunnen de producten in categoriën worden opgedeeld, denk hierbij aan buitenspullen, keukengerei en feestartikelen. In een piechart kan worden weergegeven in welke mate de categorieën worden gehuurd. Tot slot is het interessant om te zien hoeveel transacties er per uur plaatsvinden dit kan worden weergegeven in een barchart. Deze 3 visualisaties samen geven de zowel de gebruiker als het bedrijf zelf een goed beeld van welke transacties plaatsvinden. Wat kan worden gebruikt voor verdere data analyse of voor reclamedoeleinden.

### Data
De Data word bij het laden van de pagina opgehaald van het bedrijf Peerby. Deze data heeft een json format.

### Verschillende onderdelen en interacties
De 3 eerder genoemde visualisaties zijn de verschillende onderdelen van de pagina. Bij de piechart kan het nog mogelijk zijn om de verschillende categorieën aan en uit te vinken om zo deze met elkaar te kunnen vergelijken. Daarnaast zal de data in de piechart gebasseerd zijn op dezelfde data als in de kaart. De barchart draait om het aantal transacties per uur dit zou kunnen gaan over dezelfde data als in de kaart over, of over meerdere dagen. De barchart wordt gekoppeld aan de piechart, wanneer op een bar wordt geklikt word specifiek de piechart van die bar getoond.

### Minimal viable product
Minimaal is nodig om de 3 visualisaties werkend te hebben met genoeg interactie zoals de checkboxes bij de piechart. De kaart moet minimaal live de beweging van de verschillende transacties laten zien, hierbij is het niet noodzakelijk dat dit over de weg gaat.

In de optimale situaties is het een aantrekkelijk geheel waarbij de data niet enkel bij het laden van de pagina wordt aangeroepen, maar ieder half uur wordt ververst, vervolgens moeten de alle 3 de visualisaties hierop worden aangepast. Dit zou het mogelijk maken om de pagina op een scherm weertegeven zonder ooit de pagina te hoeven herladen. Dit levert echter mogelijke problemen op bij het opnieuw inladen van de data, mogelijk overschrijdt deze namelijk de oude data.

### Technische problemen en beperkingen
Ik zal veel kennis moet opdoen over het laten verschijnen van data op basis van een tijdstip, en het leren gebruiken van D3 in combinatie met de google maps API. 2 nuttige bronnen hierbij staan hieronder:
- https://bl.ocks.org/mbostock/899711
- http://bl.ocks.org/marufbd/7191903

### Pagina voorbeeld
![alt text](https://github.com/JelleMul/programmeerproject/blob/master/doc/pagina%20programmeerproject%20voorbeeld.png "Voorbeeld pagina")
In de afbeelding worden de verschillende visualisaties weergeven. Op de kaart worden met de rondjes het vertrekpunt van de verschillende transacties weergegeven. Rechtsbovenin wordt de huidige tijd afgebeeld. Wanneer 2 punten met elkaar zijn verbonden betekend dit dat deze transactie heeft plaatsgevonden. Wanneer het punt nog niet verbonden is met een ander punt zal deze later op de dag nog plaatsvinden. Bij het punt linksonderin is te zien dat de bezorger nog onderweg is aangezien het wel vertrokken is maar nog niet eindigt bij een punt.

### prototype
![alt text](https://github.com/JelleMul/programmeerproject/blob/master/doc/prototype.PNG "Prototype")
