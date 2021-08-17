在antd中
form 表单内嵌套的元素 比如 input、select 等的默认值不能直接在form.initvalues中根据state动态更新
    解决办法：通过ref获取到Form组件，在Form中可以得到各种暴露的函数 其中就有setFieldsValue函数
                setFieldsValue(()=>{根据item中name更改包裹的元素默认值})
                        这里就可以根据获取到的state动态更新了
子组件没有运行componentDidMount ，
        出现原因：在父组件加载的时候，子组件就已经跟着加载了，而且因为是model 是不需要显示的，就算加载了其实也没有出现。每一次更改父组件的viewModelStatus会跟着修改子组件的状态，但是每次更改后，组件相当于更新，也就没有再次调用DidMount
        this.refElement(就是获取到的ref组件)在每次render时都会更新，所以在render方法执行时，ref所指示的组件只会时undefind

        解决：根据我的情况，我把要渲染的组件在父组件中先做了判断，是否要渲染子组件——根据Modelstatus
                Modelstatus变成想要的值后，再渲染组件，这次渲染会被当成第一次渲染，在我们点击“添加/更改时”渲染组件，出现加载的生命周期流程，关闭model时组件销毁，再点类似按钮，重新渲染，数据更新。
新进展 ：
        因为子组件每次都会卸载再更新 所以也可以不用form.setFieldsValue函数，每次加载都会根据传过来的props去初始化initvalues,就是因为不是更新子组件，所以initvalues不会更新也无所谓