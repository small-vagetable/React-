import React, { Component,Fragment } from 'react'
import {Card,Button} from 'antd'

import ReactECharts from 'echarts-for-react';
export default class Line extends Component {

    update = () => {
        
    }
    splitData=(rawData) =>{
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i][0]);
            rawData[i][0] = i;
            values.push(rawData[i]);
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }
    
    
    renderItem =(params, api)=> {
        var xValue = api.value(0);
        var openPoint = api.coord([xValue, api.value(1)]);
        var closePoint = api.coord([xValue, api.value(2)]);
        var lowPoint = api.coord([xValue, api.value(3)]);
        var highPoint = api.coord([xValue, api.value(4)]);
        var halfWidth = api.size([1, 0])[0] * 0.35;
        var style = api.style({
            stroke: api.visual('color')
        });
    
        return {
            type: 'group',
            children: [{
                type: 'line',
                shape: {
                    x1: lowPoint[0], y1: lowPoint[1],
                    x2: highPoint[0], y2: highPoint[1]
                },
                style: style
            }, {
                type: 'line',
                shape: {
                    x1: openPoint[0], y1: openPoint[1],
                    x2: openPoint[0] - halfWidth, y2: openPoint[1]
                },
                style: style
            }, {
                type: 'line',
                shape: {
                    x1: closePoint[0], y1: closePoint[1],
                    x2: closePoint[0] + halfWidth, y2: closePoint[1]
                },
                style: style
            }]
        };
    }
    

    getOption = () => {
        return {
            title: {
              text: '堆叠区域图'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['邮件营销','联盟广告','视频广告']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[120, 132, 101, 134, 90, 230, 210]
              },
              {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                name:'视频广告',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data:[150, 232, 201, 154, 190, 330, 410]
              }
            ]
          };
    }
    render() {
        return (
            <Fragment>
                <Card title=''>
                    <ReactECharts option={this.getOption()} />
                </Card>
            </Fragment>
        )
    }
}
