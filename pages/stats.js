import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Tooltip,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import {Stack, Animation, EventTracker} from '@devexpress/dx-react-chart';


const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);


export default function Stats(props) {
        const data = props.stats.formatsByYear;
        return (
            <div>
                <br/><br/>
            <Paper>
                <Chart data={data}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        name="In Theaters"
                        valueField="bigScreen"
                        argumentField="year"
                        color="#424242"
                    />
                    <BarSeries
                        name="Video"
                        valueField="smallScreen"
                        argumentField="year"
                        color="#c0c0c0"
                    />

                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    <Title text="Movies Seen By Year" />
                    <EventTracker/>
                     <Tooltip/>
                    <Stack />
                </Chart>
            </Paper>
            </div>
        );
}

export const getStaticProps = async () => {

    let stats = null
    // Fetch data from external API
    try {
        const res = await fetch(`https://cinemafile2.api.jamotro.com/stats`);
        if (res.status !== 200) {
            throw new Error('Failed to fetch')
        }
        stats = await res.json()
        const formatsByYear = [];
        Object.keys(stats.formatsByYear).forEach((year) => {
            let newFormat = {
                year: year.toString(),
                smallScreen: stats.formatsByYear[year]['Video'],
                bigScreen: stats.formatsByYear[year]['In Theaters']
            };
            formatsByYear.push(newFormat);
        })
        stats.formatsByYear = formatsByYear;
    } catch (err) {
        stats = { error: { message: err.message } }
    }
    // Pass data to the page via props
    return { props: {stats} }
}

