<template>
    <section class="dashboard-wrapper">
        <a-row class="row-top">
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Stars of ant-design-vue">
                    <div @click="jumpToAntdRepo" class="block-wrapper">
                        <a-icon class="star" type="star"/>
                        <span>{{this.stargazers_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Watch count of ant-design-vue">
                    <div @click="jumpToAntdRepo" class="block-wrapper">
                        <a-icon class="eye" type="eye"/>
                        <span>{{this.subscribers_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Forks of ant-design-vue">
                    <div @click="jumpToAntdRepo" class="block-wrapper">
                        <a-icon class="save" type="save"/>
                        <span>{{this.forks}}</span>
                    </div>
                </a-tooltip>
            </a-col>
            <a-col class="wrapper" :lg="6" :md="6" :sm="12" :xl="6" :xs="12">
                <a-tooltip :mouse-enter-delay="0.5" title="Issues of ant-design-vue">
                    <div @click="jumpToAntdRepo" class="block-wrapper">
                        <a-icon class="message" type="message"/>
                        <span>{{this.open_issues_count}}</span>
                    </div>
                </a-tooltip>
            </a-col>
        </a-row>
        <a-row class="row-mid">
            <a-col class="chart-wrapper" :span="24">
                <canvas class="line-chart" style="position: relative; height:60vh; width:95%" ref="lineChart"/>
            </a-col>
        </a-row>
        <a-row class="row-bottom">
            <a-col class="chart-wrapper" :span="6">
                <canvas class="bar-chart" style="position: relative; height:40vh; width:95%" ref="barChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="bubble-chart" style="position: relative; height:40vh; width:95%" ref="bubbleChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="pie-chart" style="position: relative; height:40vh; width:95%" ref="pieChart"/>
            </a-col>
            <a-col class="chart-wrapper" :span="6">
                <canvas class="radar-chart" style="position: relative; height:40vh; width:95%" ref="radarChart"/>
            </a-col>
        </a-row>

    </section>
</template>

<script>
    import Chart from 'chart.js'
    import moment from 'moment'
    export default {
        name: "Dashboard",
        async mounted() {
            await this.$nextTick();
            this.initChart('lineChart', 'line');
            this.initChart('barChart', 'bar');
            this.initChart('bubbleChart', 'bubble');
            this.initChart('pieChart', 'pie', {scales: null});
            this.initChart('radarChart', 'radar', {scales: null});
            this.initData();
            for (let instance in this.chartInstance) {
                this.generateData(this.chartInstance[instance])
            }
        },
        data() {
            return {
                stargazers_count: 0,
                subscribers_count: 0,
                forks: 0,
                open_issues_count: 0,
                chartInstance: {},
                timer: null
            }
        },
        beforeDestroy() {
            for (let instance in this.chartInstance) {
                clearInterval(this.chartInstance[instance].timer)
            }
        },
        methods: {
            jumpToAntdRepo () {
                window.open('https://github.com/vueComponent/ant-design-vue')
            },
            initData() {
                this.api.dashboard.repositoryInfos().then(res => {
                    this.stargazers_count = res.data.stargazers_count;
                    this.subscribers_count = res.data.subscribers_count;
                    this.forks = res.data.forks;
                    this.open_issues_count = res.data.open_issues_count
                })
            },
            updateScale (chart, head) {
                chart.options.scales.xAxes[0].ticks.min = head.x;
            },
            generateData (chart) {
                const type = chart.config.type;
                const fn = function () {
                    let head = chart.data.datasets[0].data;

                    if (type === 'pie' || type === 'radar') {
                        chart.data.labels.push(moment(new Date()).format('h:mm:ss'));
                        chart.data.labels.length > 7 ? chart.data.labels.shift(): undefined;
                        chart.data.datasets.map(dataset => {
                            dataset.data.push(Math.round(Math.random()*200));
                            if (dataset.data.length > 7) {
                                dataset.data.shift();
                            }
                        });
                    } else {
                        chart.data.datasets.map(dataset => {
                            dataset.data.push({x: moment(new Date()), y:Math.round(Math.random()*200)});
                            if (dataset.data.length > 19) {
                                dataset.data.shift();
                            }
                        });
                        this.updateScale(chart, head[0]);
                    }
                    chart.update();
                }.bind(this);
                fn();
                chart.timer = setInterval(fn, 2000);
            },
            initChart (ref, type = 'line', config = {}) {
                const salesData = {
                    labels: type === 'pie' || type === 'radar' ? [] : ["Front", "Middle", "Back"],
                    datasets: [
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "Front",
                            backgroundColor: "rgba(246,114,128,0.35)",
                            borderColor: "rgb(246,114,128)",
                            pointBackgroundColor: "rgb(246,114,128)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        },
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "Middle",
                            backgroundColor: "rgba(155,227,222, 0.35)",
                            borderColor: "rgb(155,227,222)",
                            pointBackgroundColor: "rgb(155,227,222)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        },
                        {
                            barPercentage: 0.5,
                            barThickness: 6,
                            maxBarThickness: 8,
                            minBarLength: 2,
                            label: "Back",
                            backgroundColor: "rgba(19, 71, 34, 0.35)",
                            borderColor: "rgba(88, 188, 116, 1)",
                            pointBackgroundColor: "rgba(88, 188, 116, 1)",
                            pointBorderColor: "rgba(255,255,255,1)",
                            pointHoverBorderColor: "rgb(255,252,107)",
                            data: []
                        }
                    ]
                };
                const ctx = this.$refs[ref].getContext("2d");
                const options = {
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Time ( UTC )'
                            },
                            type: 'time',
                            time: {
                                displayFormats: {
                                    second: 'h:mm:ss'
                                }
                            },
                            ticks: {
                                source: 'data',
                                min: moment(new Date()).subtract(3,'s'),
                                maxRotation: 90,
                                minRotation: 0
                            }
                        }],
                    },
                    pointDotRadius : 6,
                    pointDotStrokeWidth : 2,
                    datasetStrokeWidth : 3,
                    scaleShowVerticalLines: false,
                    scaleGridLineWidth : 2,
                    scaleShowGridLines : true,
                    scaleGridLineColor : "rgba(225, 255, 255, 0.02)",
                    scaleOverride: true,
                    scaleSteps: 9,
                    scaleStepWidth: 500,
                    scaleStartValue: 0,
                    responsive: true
                };
                this.chartInstance[ref] = new Chart(ctx, {
                    type: type,
                    data: salesData,
                    options: Object.assign(options, config)
                });

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @keyframes scale_animate
        0%
            transform scale(1)
        20%
            transform scale(0.8)
        70%
            transform scale(1.6)
        100%
            transform scale(1)

    .dashboard-wrapper
        position: relative;
        .wrapper
            background-color #fff
            border 6px solid #f0f2f5
            &:hover {
                transition: all .5s ease;
            }
        .row-top, .row-bottom
            padding 0 10px
        row-mid
            padding 6px 10px
        .chart-wrapper
            background-color #fff
            padding 10px
            border 6px solid #f0f2f5
            border-radius 8px
            &:hover
                z-index 10
                transition all .5s ease-in-out
                box-shadow: 0 0 12px 2px rgba(189,189,189,.75);
                border-color white
        .block-wrapper
            height 200px
            line-height 200px
            background-color #fff
            padding-left 25%
            padding-right 25%
            border-radius 6px
            display flex
            justify-content center
            align-items center
            border-color: white;
            &:hover
                transition all .5s ease-in-out
                box-shadow: 0 0 12px 2px rgba(189,189,189,.75);
            .star
                color #42b983
            .eye
                color #1890ff
            .save
                color lightcoral
            .message
                color deeppink
            .anticon
                flex 1
                font-size 30px
            .anticon:hover
                animation scale_animate .5s
                animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
            span
                flex 1
                font-weight bold
                font-size larger
                font-family "Comic Sans MS"



</style>
