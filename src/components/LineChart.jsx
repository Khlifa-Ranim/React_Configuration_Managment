import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import {
  fetchUsers,
} from "../redux/UserSlices/FetchUserSlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  featchConfigurations,
} from "../redux/ConfigurationSlices/Featch_ConfigurationSlice";
import {
  featchConfigurationsVersion,
} from "../redux/ConfigurationVersionSlice/FeatchConfigurationVersion";

const LineChart =({isCustomLineColors = false, isDashboard= false})=>{

    const theme=useTheme()
    const colors=tokens(theme.palette.mode)
    const dispatch = useDispatch();
/***********************Users Featched******************************* */
    const user = useSelector((state) => state.FetchUsersStore);
    const Users = user.users;
    const UserCount=Users.length;
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, []);

    const chartData = [
      {
        id: "users",
        data: Users.map((user) => ({
          x: user.id,
          y: user.username,
        })),
      },
    ];
  /******************Featched Configurations************************* */
  const Configurations = useSelector(
    (state) => state.Featch_Configurations_Store
  );
  const tabConfigurations = Configurations.TabConfiguration;
  
  useEffect(() => {
    dispatch(featchConfigurations());
  }, []);
  
  const chartDataConfiguration = [
    {
      id: "Configurations",
      data: tabConfigurations.map((configuration) => ({
        x: configuration.id,
        y: configuration.version,
      })),
    },
  ];
/*****************************Featch Configuration Version*************** */
const Configuration_version = useSelector((state) => state.FeatchConfigurationversionStore);
const tabConfigurationVersion = Configuration_version.TabConfigurationVersion;

useEffect(() => {
  dispatch(featchConfigurationsVersion());
}, []); // run useEffect when roleDeleted changes


const ChatDataConfigurationVersion = [
  {
    id: "Configurations",
    data: tabConfigurationVersion.map((configuration) => ({
      x: configuration.version,
      y: configuration.id_configuration,
    })),
  },
];
    return(
        <ResponsiveLine
        data={ChatDataConfigurationVersion}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Versions", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "ID_Configuration", // added
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />

    )
}

export default LineChart;