# revit-3dtile-test

## 1. Revit source file

https://measuredsurvey365.co.uk/revit-hotel-project-training/

An architectural 3D Revit model of eleven storey hotel building.

The building consists of a basement floor with two commercial unit floor above it. The remaining floors are for residential purposes. The 3D model includes walls, floors, ceilings, stairs, roof structures as well as all windows and doors.

<img src="./images/2888_AR7-768x488.png" alt="hotel building" width="800px">

## 2. Conversion

a. Convert the Revit file to Cesium 3D Tile by FME
(https://www.safe.com/)

b. I have prepared two sets of 3D tiles for testing. one small subset of features and one contains all the features. You may download the files at the following google drive.

    i) small testing features (240KB)
         https://drive.google.com/file/d/1rfnFUZxPP0yCHdfA8YeNpQ6DrFVQqTYs/view?usp=share_link

    ii) all features (360MB)
         https://drive.google.com/file/d/13OwnV23B3mheskzRBKPDAAdaWT1iHZca/view?usp=share_link

## 3. Install, run and test

a. Unzip the zip files, install and start local web server

```
unzip test.zip
unzip OutputFull.zip
npm i -g serve
serve -l 1234
```

open a broswer, enter the following url. You should see the json.

http://localhost:1234/test/tileset.json <br>
http://localhost:1234/OutputFull/tileset.json <br>

b. Open the Cesium Sandcastle website <br> https://sandcastle.cesium.com/?src=3D%20Tiles%20Formats.html&label=3D%20Tiles

c. Copy and paste the code from the content of cesium_sancastle_test.js to replace the current code. click "Run (F8)" button at the top menu bar.

<img src="./images/cesium_sandcastle.png" alt="hotel building" width="800px">

d. Enjoy playing the BIM model! When you mouse over a feature, it will be highlighed. When you click on the feature, it will show the meta data.
