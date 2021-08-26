import React, { Component,Fragment } from 'react'
import {Card,Button} from 'antd'

import ReactECharts from 'echarts-for-react';
export default class Bar extends Component {

    state= {
        seals : [25,32,85,45,92,15]
    }
    update = () => {
        this.setState(state=>{
            let newseals = state.seals.map(v=>v+parseInt(Math.random()*10))
            // console.log(newseals)
            return {seals:newseals}
        })
    }
    getOption = (seals) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: seals
            }]
        };
    }
    render() {

        // console.log(this.state.seals)
        return (
            <Fragment>
                <Card >
                    <Button type='primary' onClick = {this.update}>更新</Button>
                </Card>
                <Card title=''>
                    <ReactECharts option={this.getOption(this.state.seals)} />
                </Card>
            </Fragment>
        )
    }
}
