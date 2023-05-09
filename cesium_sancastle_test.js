Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYjk1ZmYyNS1kMDdmLTRmZTAtODhhNy1hNjJmZjAxNDQxYjciLCJpZCI6MjA1NjQsImlhdCI6MTY4MzQ2MTM0OX0.egLSrEe3AJVyfCudEWd158DQyTvPBxxVsbqZVdohTzY";

const viewer = new Cesium.Viewer("cesiumContainer", {
  shadows: true,
});
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
const inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;

viewer.clock.currentTime = new Cesium.JulianDate(2457522.154792);

const scene = viewer.scene;
let tileset;

const viewModel = {
  tilesets: [
    {
      name: "Test features",
      type: "url",
      resource: "http://localhost:1234/test/tileset.json",
    },
    {
      name: "Full features",
      type: "url",
      resource: "http://localhost:1234/OutputFull/tileset.json",
    },
    {
      name: "Cesium ion assets",
      type: "assets",
      resource: "1683656",
    },
  ],
  selectedTileset: undefined,
  shadows: true,
};

Cesium.knockout.track(viewModel);

const toolbar = document.getElementById("toolbar");
Cesium.knockout.applyBindings(viewModel, toolbar);

Cesium.knockout
  .getObservable(viewModel, "shadows")
  .subscribe(function (enabled) {
    viewer.shadows = enabled;
  });

let resourceToLoad;
Cesium.knockout
  .getObservable(viewModel, "selectedTileset")
  .subscribe(async function (options) {
    if (Cesium.defined(tileset)) {
      scene.primitives.remove(tileset);
    }
    if (!Cesium.defined(options)) {
      inspectorViewModel.tileset = undefined;
      resourceToLoad = undefined;
      return;
    }

    resourceToLoad = options.resource;
    try {
      if (options.type == "url") {
        tileset = await Cesium.Cesium3DTileset.fromUrl(resourceToLoad, {
          enableDebugWireframe: true,
        });
      } else {
        tileset = await Cesium.Cesium3DTileset.fromIonAssetId(resourceToLoad, {
          enableDebugWireframe: true,
        });
      }

      if (options.resource !== resourceToLoad) {
        // Another tileset was loaded. Discard the result.
        return;
      }
      viewer.scene.primitives.add(tileset);

      inspectorViewModel.tileset = tileset;
      viewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(
          0,
          -2.0,
          Math.max(100.0 - tileset.boundingSphere.radius, 0.0)
        )
      );

      const properties = tileset.properties;
      if (Cesium.defined(properties) && Cesium.defined(properties.Height)) {
        tileset.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [
              ["${Height} >= 83", "color('purple', 0.5)"],
              ["${Height} >= 80", "color('red')"],
              ["${Height} >= 70", "color('orange')"],
              ["${Height} >= 12", "color('yellow')"],
              ["${Height} >= 7", "color('lime')"],
              ["${Height} >= 1", "color('cyan')"],
              ["true", "color('blue')"],
            ],
          },
        });
      }
    } catch (error) {
      console.log(`Error loading tileset: ${error}`);
    }
  });

viewModel.selectedTileset = viewModel.tilesets[0];

const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

handler.setInputAction(function (movement) {
  // const feature = inspectorViewModel.feature;
  // if (Cesium.defined(feature)) {
  //   const propertyIds = feature.getPropertyIds();
  //   const length = propertyIds.length;
  //   for (let i = 0; i < length; ++i) {
  //     const propertyId = propertyIds[i];
  //     console.log(`${propertyId}: ${feature.getProperty(propertyId)}`);
  //   }
  // }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

handler.setInputAction(function (movement) {
  const feature = inspectorViewModel.feature;
  if (Cesium.defined(feature)) {
    feature.show = false;
  }
}, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
