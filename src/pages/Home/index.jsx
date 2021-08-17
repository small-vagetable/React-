import React, { Component } from 'react'
export default class Home extends Component {
    render() {
        return (
            <div className="layui-fluid">
        <div className="layui-row layui-col-space15">
            <div className="layui-col-md12">
                <div className="layui-card">
                    <div className="layui-card-body ">
                        <blockquote className="layui-elem-quote">欢迎管理员：
                            <span className="x-red">test</span>！当前时间: <span id="nowtime"></span>
                        </blockquote>
                    </div>
                </div>
            </div>
            <div className="layui-col-md12">
                <div className="layui-card">
                    <div className="layui-card-header">数据统计</div>
                    <div className="layui-card-body ">
                        <ul className="layui-row layui-col-space10 layui-this x-admin-carousel x-admin-backlog">
                            <li className="layui-col-md2 layui-col-xs6">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>总考试次数</h3>
                                    <p>
                                        <cite>121</cite></p>
                                </a>
                            </li>
                            <li className="layui-col-md2 layui-col-xs6">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>优秀次数</h3>
                                    <p>
                                        <cite>110</cite></p>
                                </a>
                            </li>
                            <li className="layui-col-md2 layui-col-xs6">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>及格次数</h3>
                                    <p>
                                        <cite>99</cite></p>
                                </a>
                            </li>
                            <li className="layui-col-md2 layui-col-xs6">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>总达标次数</h3>
                                    <p>
                                        <cite>67</cite></p>
                                </a>
                            </li>
                            <li className="layui-col-md2 layui-col-xs6">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>不及格次数</h3>
                                    <p>
                                        <cite>67</cite></p>
                                </a>
                            </li>
                            <li className="layui-col-md2 layui-col-xs6 ">
                                <a href="#" className="x-admin-backlog-body">
                                    <h3>未考次数</h3>
                                    <p>
                                        <cite>6766</cite></p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="layui-col-sm6 layui-col-md3">
                <div className="layui-card">
                    <div className="layui-card-header">科目数量
                        <span className="layui-badge layui-bg-cyan layuiadmin-badge">学期</span></div>
                    <div className="layui-card-body  ">
                        <p className="layuiadmin-big-font">12</p>
                        <p>新增率
                            <span className="layuiadmin-span-color">10%
                                    <i className="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="layui-col-sm6 layui-col-md3">
                <div className="layui-card">
                    <div className="layui-card-header">挂科数量
                        <span className="layui-badge layui-bg-cyan layuiadmin-badge">学期</span></div>
                    <div className="layui-card-body ">
                        <p className="layuiadmin-big-font">0</p>
                        <p>新增率
                            <span className="layuiadmin-span-color">0%
                                    <i className="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="layui-col-sm6 layui-col-md3">
                <div className="layui-card">
                    <div className="layui-card-header">及格数量
                        <span className="layui-badge layui-bg-cyan layuiadmin-badge">学期</span></div>
                    <div className="layui-card-body ">
                        <p className="layuiadmin-big-font">12</p>
                        <p>新增率
                            <span className="layuiadmin-span-color">0%
                                    <i className="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="layui-col-sm6 layui-col-md3">
                <div className="layui-card">
                    <div className="layui-card-header">班级排名
                        <span className="layui-badge layui-bg-cyan layuiadmin-badge">学期</span></div>
                    <div className="layui-card-body ">
                        <p className="layuiadmin-big-font">35</p>
                        <p>新增率
                            <span className="layuiadmin-span-color">5%
                                    <i className="layui-inline layui-icon layui-icon-face-smile-b"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="layui-col-md12">
                <div className="layui-card">
                    <div className="layui-card-header">个人基本信息</div>
                    <div id="JiBenMsg" className="layui-card-body ">
                        <table className="layui-table">
                            <tbody>
                                <tr>
                                    <th>学号</th>
                                    <td>1.0.180420</td>
                                </tr>
                                <tr>
                                    <th>姓名</th>
                                    <td>x.xuebingsi.com</td>
                                </tr>
                                <tr>
                                    <th>性别</th>
                                    <td>WINNT</td>
                                </tr>
                                <tr>
                                    <th>班主任</th>
                                    <td>Apache/2.4.23 (Win32) OpenSSL/1.0.2j mod_fcgid/2.3.9</td>
                                </tr>
                                <tr>
                                    <th>班级</th>
                                    <td>5.6.27</td>
                                </tr>
                                <tr>
                                    <th>班级</th>
                                    <td>cgi-fcgi</td>
                                </tr>
                                <tr>
                                    <th>系名</th>
                                    <td>5.5.53</td>
                                </tr>
                                <tr>
                                    <th>宿舍</th>
                                    <td>5.0.18</td>
                                </tr>
                                <tr>
                                    <th>导员名</th>
                                    <td>2M</td>
                                </tr>
                                <tr>
                                    <th>QQ</th>
                                    <td>30s</td>
                                </tr>
                                <tr>
                                    <th>个人简介</th>
                                    <td>86015.2M</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="layui-col-md12">

            </div>
            <style id="welcome_style"></style>
            <div className="layui-col-md12">
                <blockquote className="layui-elem-quote layui-quote-nm">主界面（桌面），显示当前用户的基本信息</blockquote>
            </div>
        </div>
    </div>
        )
    }
}
