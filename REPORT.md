# Programmeerproject - REPORT
### Jelle Mul
### 11402148

### Screenshot
![alt text](https://github.com/JelleMul/programmeerproject/blob/master/doc/eind_screenshot.PNG "screenshot pagina")

### Short description
De visualisatie gemaakt voor het bedrijf PeerbyGo geeft hen een beeld van het aantal transacties, in welke categoriën deze transacties vallen en tussen welke coördinaten de transactie plaatsvindt. Een transactie hierbij is dat iemand een product huurt van iemand anders, waarbij PeerbyGo zorgt voor de levering van het product. Deze 3 componenten worden uitgebeeld in 3 visualisaties, ten eerste een kaart waarop alle begin en eindpunten van een transactie staan weergegeven, met hierbij in een tooltip informatie over de transactie. Daarnaast kan deze kaart gefilterd worden met het dropdown menu op de transacties in specifieke tijdzones. De staafdiagram geeft het aantal transacties weer van categoriën in de tijdzones, deze is vervolgens interactief met de piechart waarin wordt weergegeven in welke mate de verschillende categoriën voorkomen in de transacties. Als extra feature is er de legenda die ook wordt geupdate op basis van de geselecteerde tijdzone en in cijfer weergeeft hoevaak een categorie voorkomt.

### Technical Design
De webpagina is opgebouwd uit een home pagina en een visualisatie pagina. De home pagina is enkel een statisch html zonder javascript dus hier zal ik verder niet op ingaan. In de visualisatie pagina worden 3 javascript files ingeladen. Het hoogste niveau is hierbij de file initialize.js hierin wordt de data ingeladen en omgezet naar het juiste format, waarna vervolgens de functies voor het maken van de dashboard (combinatie van de piechart en de barchart) en de kaart worden aangeropen. Deze functies staan respectivelijk in de bestanden dashboard.js en map.js. In onderstaand stuk wordt per file de verschillende componenten besproken hoe deze met elkaar interacteren.

#### Initialize.js
In initialize.js wordt de data ingeladen en vervolgens omgezet naar het juiste format om te visualiseren. De oorspronkelijke datasets zijn 2 jsons, echter om het dashboard te maken was het noodzakelijk om deze data om te zetten naar een array van objecten. In initialize wordt eerst de basis van deze array aangemaakt in de variabele timedata. Vervolgens wordt na het laden van de data de variabele timedata gevuld met de juiste informatie om te visualiseren. Hierbij wordt gekeken voor alle transacties in welke timestamp ze hebben plaatsgevonden, en in welke categoriën deze valt. Tot slot wordt met de Sum functie het totale aantal transacties van categoriën per timestamp berekend, zodat dit kan worden gebruikt in de barchart. Wanneer de volledige data is omgezet naar de variabele timedata worden vervolgens de functies voor het maken van het dashboard en de kaart aangeroepen.

#### Dashboard.js
Dashboard.js is opgedeeld in 3 belangrijke functies. De functie histoGram, pieChart en Legend. In Dashboard.js wordt in eerste instantie een kleur toegekent aan de verschillende categorieën, vervolgens worden de verschillende functies geïnitialiseerd. Vervolgens wordt met de functie typesToArray nog een kleine aanpassing aan de data om deze compatibel te maken voor de barchart.
<br>
<br>
In de function histoGram wordt de staafgrafiek geïntialiseerd, hierin worden de bars toegevoegd, labels gemaakt e.d.. Daarnaast bevat hij 2 functies, mouseover en mouseout. In deze functies wordt de interactie met de piechart en de legenda geregeld door het aanroepen van hun update functions. De update function van de staafgrafiek bestaat uit het aanpassen van de bars aan 1 specifieke categorie waarneer over de cirkeldiagram wordt gehoverd.
<br>
<br>
De function pieChart heeft een soortgelijke opbouw als de histogram, in eerste instantie wordt de piechart aangemaakt. De mouseover en mouseout beschrijven de hover functies van de piechart waarin de highligth function van de legenda wordt aangeroepen. De update functie werkt anders dan die van de barchart. Hierbij worden alle paths van de piechart verwijdert waarna hij weer wordt opgebouwd met de nieuwe data waarbij de barchart een transitie heeft van de oude data naar de nieuwe data.
<br>
<br>
Voor de function legend geld weer een soortgelijke opbouw, uniek hieraan is dat deze zowel een update functie heeft als een highlight functie. De update functie wordt aangeroepen waarneer 1 specifieke timestamp wordt geselecteerd met de dropdown, of mouseover van de barchart. De highlight functie wordt aangeroepen door de mouseover van de piechart waarna de categorie oplicht in de legenda.





#### Map.js
