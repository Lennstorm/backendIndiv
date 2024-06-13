# API Documentation

När servern startas utan db-filer, kommer products-databasen autofyllas.
Databasen för customers fylls med en guest-user, som är inloggad per default, och en admin.

Gäst-användare är begränsad till vissa operationer för att begränsa potentiella buggar.
Guest kan inte logga ut, uppdatera eller radera konto.

För att komma åt fler API-requests kan man skapa ett nytt konto och logga in.


## CUSTOMERS

**POST** new customer http://localhost:3000/customers

Nedanstående json kan kopieras för att skapa ny kund.

```json
{
	"firstName": "Test",
	"lastName": "Tester",
	"email": "testman@testmail.com",
	"password": "thisisatest",
	"phoneNumber": "101010010011"
}
```

**GET** Profilsida för inloggad kund. http://localhost:3000/customers/profile  

**PUT** Uppdatera inloggad kunds information. Guest kan inte uppdatera guest-kontot. http://localhost:3000/customers

Nedanstående json kan kopieras och klistras in i body för att uppdatera kund/user

```json
{
	"firstName": "TestUpdated",
	"lastName": "TesterUpdated",
	"email": "testmanUpdated@testmail.com",
	"password": "thisisatest",
	"phoneNumber": "000111000"
}
```

**DELETE** Radera inloggad kund. Guest kan inte radera guest-konto! http://localhost:3000/customers

## LOGIN

**POST** logga in användare http://localhost:3000/login

Skicka giltig json-data i body. Användare loggar in med giltig email eller telefonnummer.
Nedan test-users email och lösenord som json.

```json
{
	"email": "testman@testmail.com",
	"password": "thisisatest"
}
```

## LOGOUT

**POST** logga ut användare. Loggar automatiskt in guest http://localhost:3000/logout

## PRODUCTS

**GET** Hämta alla products http://localhost:3000/products

## CART

**GET** hämta cart http://localhost:3000/cart

**POST** Addera produkt till inloggad kunds kundvagn mha product _id som route-parameter http://localhost:3000/cart/:productId

**DELETE** ta bort produkt från kundvagn med hjälp av product _id som route-parameter http://localhost:3000/cart/:productID

## ORDER

**POST** ny order. Detta kommer tömma kundvagnen och skicka innehållet till kundens unika orderhistorik-object i orderHistory.db http://localhost:3000/orders

**GET** hämta specifik order med hjälp av ordernr för att se leveranstid och övrig info. http://localhost:3000/orders/:orderId
Använd order-ID som returneras i svaret från POST-operationen.


## ORDER HISTORY 

**GET** hämta specifik kunds orderhistorik http://localhost:3000/order-history


## ABOUT

**GET** hämta information om företaget http://localhost:3000/about



## Funktioner tillagda för individuell uppgift:
/middleware/allowAdmin.js
/services/campaign.js
/middleware/validateCampProds.js
/routes/campaigns.js

/cart.js modifierad för att ta hänsyn till kampanjer.
Kampanjrouter tillagd i app.js

**Nya anrop:**

**GET** hämta alla kampanjer http://localhost:3000/campaigns

**POST** lägg till ny kampanj -- ENDAST ADMIN -- http://localhost:3000/campaigns
Lägg till ny kampanj med json. 
Lägg in produkt-id samt paketpris.
{
  "products": ["0EGzWoJ0NqKNvMH9", "JExup8MJ0kTTKHZ4"],
  "packagePrice": 10
}

**PUT** uppdatera kampanj -- ENDAST ADMIN -- http://localhost:3000/campaigns/:id
Uppdatera kampanj med hjälp av kampanjens id.
Lägg in kampanjens id som parameter och produkter samt paketpris som json
{
  "products": ["0EGzWoJ0NqKNvMH9", "JExup8MJ0kTTKHZ4"],
  "packagePrice": 10
}


**DELETE** kampanj -- ENDAST ADMIN -- http://localhost:3000/campaigns/:id
Ta bort en kampanj.
Använder kampanjens id som parameter.