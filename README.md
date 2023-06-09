# revit-3dtile-test

## 1. Revit source file

https://measuredsurvey365.co.uk/revit-hotel-project-training/

An architectural 3D Revit model of an eleven-story hotel building.

The building consists of a basement floor with two commercial unit floors above it. The remaining floors are for residential purposes. The 3D model includes walls, floors, ceilings, stairs, roof structures, as well as all windows and doors.

<img src="./images/2888_AR7-768x488.png" alt="hotel building" width="800px">

## 2. Conversion

a. Convert the Revit file to Cesium 3D Tiles by FME
(https://www.safe.com/)

b. I have prepared two sets of 3D tiles for testing: one small subset of features and one containing all the features. You may download the files from the following Google Drive links.

i) <a href="https://drive.google.com/file/d/1rfnFUZxPP0yCHdfA8YeNpQ6DrFVQqTYs/view?usp=share_link" >small testing features (240KB)</a>

ii) <a href="https://drive.google.com/file/d/13OwnV23B3mheskzRBKPDAAdaWT1iHZca/view?usp=share_link" >all features (360MB)</a>

## 3. Install, run and test

a. Unzip the zip files, install and start local web server

```
unzip test.zip
unzip OutputFull.zip
npm i -g http-server
http-server -o --cors -p 1234
```

Open a browser and enter the following URLs. You should see the JSON.

http://localhost:1234/test/tileset.json <br>
http://localhost:1234/OutputFull/tileset.json <br>

b. Open the Cesium Sandcastle website <br> https://sandcastle.cesium.com/?src=3D%20Tiles%20Formats.html&label=3D%20Tiles

c. Copy and paste the code from the content of cesium_sandcastle_test.js to replace the current code. Click the "Run (F8)" button on the top menu bar.

<img src="./images/cesium_sandcastle.png" alt="hotel building" width="800px">

d. Enjoy playing with the BIM model! When you mouse over a feature, it will be highlighted. When you click on the feature, it will show the metadata.
