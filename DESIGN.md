# Programmeerproject - Design Document
### Jelle Mul
### 11402148

### Data
De data is van 3 willekeurige dagen in de afgelopen weken. De reden dat dit niet van de laatste dagen is heeft te maken met de verplichting om een open source project te maken. Het bedrijf wil in verband met privacy redenen en het risico dat ook andere mensen bij hun data kunnen beperken. Ik heb 2 datasets beschikbaar. De eerste dataset bevat alle transacties die hebben plaatsgevonden in 3 dagen tijd. In deze dataset staat onder andere het ID van de transactie, de bezorgtijd en de ophaaltijd met daarbij behorende lengte en breedtegraden. In de 2de dataset staan de archetypes. Met behulp van deze dataset kunnen de transacties worden opgedeeld in verschillende categorieën die in de piechart kunnen worden gebruikt. Onderaan de pagina staan 2 afbeelding van het format van de data in de 2 datasets. 

### Pagina structuur
De kaart bestaat uit de google maps api met hierop een overlay van D3. De kaart fungeert enkel om een beeld te geven van de positie. D3 wordt in eerste in stantie gebruikt om de lijnen te trekken tussen de vertrek en aankomstpunten. Wanneer de data is ingeladen begint de virtuele tijd met lopen. Op het moment dat een product vertrek wordt er een lijn getrokken van het vertrekpunt naar het eindpunt, mooi zou zijn wanneer hier een afbeelding van een fiets meebeweegt. Wanneer de plaats van bestemming wordt bereikt verdwijnt de lijn, maar blijft de fiets wel staan. Op het moment dat de het product weer terug wordt gebracht begint de fiets weer met rijden. In de bron van jaketrent is een simpele tutorial hoe een animatie kan worden gemaakt van een lijn tekenen. 2 voorbeelden waarin een combinatie wordt gebruikt van D3 met de google maps API staan in link 2 en 3.
Lastig zal nog zijn om daadwerkelijk de tijd te laten verstrijken, boeiend hierbij is voorbeeld 6

De staafgrafiek geeft het aantal transacties weer per uur, ofwel dit is een relatief simpele staafgrafiek. Wanneer op 1 specifieke bar wordt geklikt wordt dit geupdate naar de piechart, waar dan de data van dat specifieke uur worden weergegeven. Wanneer er op geen enkele bar is geklikt wordt in de piechart de volledige data weergegeven.

De piechart is dus gelinked aan de barchart, daarnaast heeft deze ook een interactieve legenda, zoals ook gedaan is in de fiddle van link 5. Van belang om te beseffen is dat 1 product in meerdere categorieën kan vallen. De piechart is duur puur om te kijken welke categorieën populair zijn, maar op geen enkele wijze een maat voor het aantal transacties.

1. Drawing a line
http://jaketrent.com/post/animating-d3-line/
2. https://bl.ocks.org/mbostock/899711
3. http://bl.ocks.org/marufbd/7191903
4. boek D3
http://chimera.labs.oreilly.com/books/1230000000345/index.html
5. http://jsfiddle.net/cez5124k/7/ in combinatie met http://jsfiddle.net/zppL1pm7/7/
6. http://tipstrategies.com/interactive/2014_map/
7. http://bl.ocks.org/NPashaP/96447623ef4d342ee09b super handige combo van barchart en piechart

### Dataset1
![alt text](https://github.com/JelleMul/Programmeerproject/blob/master/doc/Sample_transactiondata.PNG "Voorbeeld Dataset1")

### Dataset 2
![alt text](https://github.com/JelleMul/Programmeerproject/blob/master/doc/Sample_Aerchtypedata.PNG "Voorbeeld Dataset2")
