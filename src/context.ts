import { TrackAPI } from "./datasources/trackAPI";
import { GhibliAPI } from "./datasources/ghibliAPI";

export type DataSourceContext = {
    dataSources: {
      trackAPI: TrackAPI
      ghibliAPI: GhibliAPI;
    };
  };