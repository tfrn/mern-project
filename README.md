# MERN PROJESİ DEPLOY (RENDER)

* client kısmı serverin içine alındı. (şart değil).
* serverde **concurrently** import edilir. 
* serverin package.json, scripts kısmı;

```json
  "scripts": {
    "start": "node index.js",
    "start-server": "nodemon index.js",
    "client": "npm start --prefix client",
    "clientinstall": "npm install --prefix client",
    "dev": "concurrently \"npm run start-server\" \"npm run client\"",
    "render-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
```

* yine serverin index.js içerisine de; 

```js
const path = require('path');
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }
```

* client içerisindeki packege.json/scripts içerisine;
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

* daha sonra, ``npm run build`` diyerek **build** klasörü oluşturulur. 

* Tüm dosyalar github'a yüklenir. 

* render.com'da, backend için **web service**, frontend için **static site** ayrı ayrı oluşturulur.

#### backend - web service

* settingste, 
**brach: main**
**root directory: boş**
**build command: npm install**
**start Command: npm run dev**
* enviroment ve secret files olaran .env bilgileri girilir. 
* deploy işlemi başlatılır. 

#### backend - static site

* settingste, 
**brach: main**
**root directory: boş**
**build command: npm run render-postbuild** 
**publish directory: ./client/build**
* enviroment ve secret files olaran .env bilgileri girilir. 
* Redirect and Rewrite Rules'da;
**source: /\***
**destination: backend web service sitesinin yolu (https://mern-project-viqo.onrender.com gibi)**
* deploy işlemi başlatılır. 
