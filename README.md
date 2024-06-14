# Dokumentation Airbean API

När servern startas utan db-filer, kommer products-databasen autofyllas.  
Databasen för customers fylls med en guest-user, som är inloggad per default, och en admin.  

Gäst-användare är begränsad till vissa operationer för att begränsa potentiella buggar.  
Guest kan inte logga ut, uppdatera eller radera konto.  

För att komma åt fler API-requests kan man skapa ett nytt konto och logga in.

---
  
## KUNDER / ANVÄNDARE
  
### Skapa kund

**Beskrivning** 
Anrop för att skapa ny kund.  
Returnerar svar med den info man lagt in.
Returnerar felmeddelande om man inte lagt in all nödvändig info eller om inte uppgifterna uppfyller kriterierna för form.

**URL** 
POST http://localhost:3000/customers

**Body**

```json
{
	"firstName": "Test",
	"lastName": "Tester",
	"email": "testman@testmail.com",
	"password": "thisisatest",
	"phoneNumber": "101010010011"
}
```
  
### Hämta profilsida

**Beskrivning**  
Hämtar profilsida med all lagrad info om inloggad kund. 

**URL** 
GET http://localhost:3000/customers/profile  
  
### Uppdatera kund

**Beskrivning**  
Uppdaterar inloggad kunds information i databasen.  
Guest kan inte uppdatera guest-kontot. 
 
**URL** 
 PUT http://localhost:3000/customers

**Body**
```json
{
	"firstName": "TestUpdated",
	"lastName": "TesterUpdated",
	"email": "testmanUpdated@testmail.com",
	"password": "thisisatest",
	"phoneNumber": "000111000"
}
```
  
### Radera kund
**Beskrivning**  
Raderar inloggad kund från databasen.  
Guest kan inte radera guest-konto!  

**URL** 
DELETE http://localhost:3000/customers

  
## LOGIN/LOGOUT
  
### Logga in

**Beskrivning**  
Loggar in användare  
Användare loggar in med giltig email eller telefonnummer.  

**URL** 
POST http://localhost:3000/login


**BODY** 
```json
{
	"email": "testman@testmail.com",
	"password": "thisisatest"
}
```

  
###  LOGOUT

**Beskrivning**  
Loggar ut användare.  
Loggar automatiskt in guest.  

**URL** 
POST http://localhost:3000/logout

  
## PRODUCTS
  
### Hämta produkter
**Beskrivning**  
Hämtar en lista över alla produkter i databasen.  

**URL** 
GET http://localhost:3000/products

  
## Kundvagn
  
### Hämta kundvagn  

**Beskrivning**  
Hämtar kundvagn för inloggad kund.  
Returnerar kundvagn med artiklar och pris om det lagts till produkter.  
Returnerar "Din kundvagn är tom" om inga produkter lagts till.  

**URL** 
GET http://localhost:3000/cart
  
### Lägg till produkt  

**Beskrivning**  
Addera produkt till inloggad kunds kundvagn med hjälp av product _id som route-parameter.  

**URL** 
POST http://localhost:3000/cart/:productId

**Query-Parameter**
+ product_id

**Beskrivning**  
Ta bort produkt från kundvagn med hjälp av product _id som route-parameter. 
Returnerar "Produkten du försöker ta bort finns inte i varukorgen" om produkten inte finns i varukorgen.

**URL** 
DELETE http://localhost:3000/cart/:productID

**Query-Parameter**
+ product_id

  
## ORDER
  
### Skapa order
**Beskrivning**  
Skapar ny order.  
Detta kommer tömma kundvagnen och skicka innehållet till kundens unika orderhistorik-object i orderHistory.db  
Returnerar "Cart is empty" om inga varor finns att skicka.

**URL** 
POST http://localhost:3000/orders

  
### Hämta order

**Beskrivning**  
Hämtar specifik order med hjälp av ordernr för att se leveranstid och övrig info.  
Om order inte hittas returneras "error": "Order NOT found!"

**URL** 
GET http://localhost:3000/orders/:orderId

**Query-Parameter**
+ Order-ID som returneras i svaret från POST-operationen.  
  
## ORDER HISTORY 
  
### Hämta historik

**Beskrivning**  
Hämtar inloggad kunds orderhistorik och returnerar all data i en array.
Saknas orderhistorik returneras "Order History not found"
Guest kan inte göra detta, och får felmeddelande "Guests cannot execute this operation".

**URL** 
GET http://localhost:3000/order-history
  
### Hämta all historik

**Beskrivning**  
Kan bara utföras av admin.
Hämtar all orderhistorik och returnerar all data i en array.
Vanlig kund kan inte göra anropet och får felmeddelande "Only Admin can execute this operation".  
Guest kan inte göra detta, och får felmeddelande "Guests cannot execute this operation".

**URL** 
GET localhost:3000/order-history/all
  
## ABOUT
  
### Hämta företagsinfo

**Beskrivning**  
Hämtar information om företaget och returnerar data med en presentation av företaget.  

**URL** 
GET http://localhost:3000/about  

  
## Funktioner tillagda för individuell uppgift:  
/middleware/allowAdmin.js  
/services/campaign.js  
/controllers/campaigncontroller.js
/middleware/validateCampProds.js  
/routes/campaigns.js  

/cart.js modifierad för att ta hänsyn till kampanjer.  
Kampanjrouter tillagd i app.js  
  
## Anrop individuell uppgift:
  
### Hämta kampanjer  

**Beskrivning**  
Hämtar de kampanjer som finns och returnerar dessa med information om vilka produkter som ingår och till vilket pris.
Om inga kampanjer finns inlagda returneras "message": "Inga kampanjer finns för tillfället."  

**URL**  
GET http://localhost:3000/campaigns  
  
### Lägg till kampanj

**Beskrivning**  
Skapar en ny kampanj genom att admin lägger in _id för de produkter som ska ingå samt till vilket paketpris.  
Kan endas utföras av admin.  
Vanlig användare och guest får felmeddelande "Only Admin can execute this operation"  

**URL** 
POST http://localhost:3000/campaigns  

**BODY** 
{
  "products": ["0EGzWoJ0NqKNvMH9", "JExup8MJ0kTTKHZ4"],
  "packagePrice": 10
}
  
### Uppdatera kampanj  

**Beskrivning**  
Uppdatera kampanj med hjälp av kampanjens id.  
Kan endas utföras av admin.  
Vanlig användare och guest får felmeddelande "Only Admin can execute this operation"  
Lägg in kampanjens id som parameter och produkter samt paketpris som json  

**URL**  
PUT http://localhost:3000/campaigns/:id  

**BODY** 
{
  "products": ["0EGzWoJ0NqKNvMH9", "JExup8MJ0kTTKHZ4"],
  "packagePrice": 10
}  

**Query-Parameter**
+ Kampanj-ID som returneras i svaret från POST-operationen.  
  
### Ta bort kampanj  
**Beskrivning**  
Ta bort en kampanj med kampanjens id som parameter.  
Kan endas utföras av admin.  
Vanlig användare och guest får felmeddelande "Only Admin can execute this operation"  

**URL** 
DELETE http://localhost:3000/campaigns/:id  

**Query-Parameter**
+ Kampanj-ID som returneras i svaret från POST-operationen.  

