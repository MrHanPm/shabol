var app = getApp();
Page({
    data:{
        toCaption:'A',
        province:[
            {
                code:'A',
                list:[
                    {
                        id:340000,
                        name:'安徽'
                    }
                ]
            },
            {
                code:'B',
                list:[
                    {
                        id:110000,
                        name:'北京'
                    }
                ]
            },
            {
                code:'C',
                list:[
                    {
                        id:500000,
                        name:'重庆'
                    }
                ]
            },
            {
                code:'F',
                list:[
                    {
                        id:350000,
                        name:'福建'
                    }
                ]
            },
            {
                code:'G',
                list:[
                    {
                        id:620000,
                        name:'甘肃'
                    },
                    {
                        id:440000,
                        name:'广东'
                    },
                    {
                        id:450000,
                        name:'广西'
                    },
                    {
                        id:520000,
                        name:'贵州'
                    }
                ]
            },
            {
                code:'H',
                list:[
                    {
                        id:460000,
                        name:'海南'
                    },
                    {
                        id:130000,
                        name:'河北'
                    },
                    {
                        id:410000,
                        name:'河南'
                    },
                    {
                        id:230000,
                        name:'黑龙江'
                    },
                    {
                        id:430000,
                        name:'湖南'
                    },
                    {
                        id:420000,
                        name:'湖北'
                    }
                ]
            },
            {
                code:'J',
                list:[
                    {
                        id:220000,
                        name:'吉林'
                    },
                    {
                        id:320000,
                        name:'江苏'
                    },
                    {
                        id:360000,
                        name:'江西'
                    }
                ]
            },
            {
                code:'L',
                list:[
                    {
                        id:210000,
                        name:'辽宁'
                    }
                ]
            },
            {
                code:'N',
                list:[
                    {
                        id:150000,
                        name:'内蒙古'
                    },
                    {
                        id:640000,
                        name:'宁夏'
                    }
                ]
            },
            {
                code:'Q',
                list:[
                    {
                        id:630000,
                        name:'青海'
                    }
                ]
            },
            {
                code:'S',
                list:[
                    {
                        id:310000,
                        name:'上海'
                    },
                    {
                        id:370000,
                        name:'山东'
                    },
                    {
                        id:140000,
                        name:'山西'
                    },
                    {
                        id:610000,
                        name:'陕西'
                    },
                    {
                        id:510000,
                        name:'四川'
                    }
                ]
            },
            {
                code:'T',
                list:[
                    {
                        id:120000,
                        name:'天津'
                    }
                ]
            },
            {
                code:'X',
                list:[
                    {
                        id:540000,
                        name:'西藏'
                    },
                    {
                        id:650000,
                        name:'新疆'
                    }
                ]
            },
            {
                code:'Y',
                list:[
                    {
                        id:530000,
                        name:'云南'
                    }
                ]
            },
            {
                code:'Z',
                list:[
                    {
                        id:330000,
                        name:'浙江'
                    }
                ]
            }
        ],
        cities:[],
        cityVisible:'',
        cityX:'100%',
        selectedProvince:{},
        selectedCity:'',
    },
    type:'',
    onLoad:function(o){
        this.type = o.name
    },
    toSectionPosition:function(e){
        let target = e.target;
        this.setData({
            toCaption:target.id
        })
    },
    getProvince:function(e){
      let target = e.target,that = this;
      wx.request({
        url:app.ajaxurl,
        data:{
          c:'cargood',
          m:'procity',
          ts:+new Date()
        },
        success:function(res){
          that.setData({
            province:res.data,
            provinceid:'',
          })
        }
      })
    },
    getCities:function(e){
        let target = e.target,
            that = this;
        wx.request({
            url:app.ajaxurl,
            data:{
                c:'cargood',
                m:'ajaxGetNewCity',
                proid:target.id,
                ts:+new Date()
            },
            success:function(res){
                res = res.data;
                that.setData({
                    cities:res.data,
                    selectedProvince:{
                        id:target.id,
                        name:target.dataset['name']
                    },
                    selectedCity:''
                });
                that.data['cityVisible'] || that.setData({
                    cityVisible:'visible',
                    cityX:0
                });
            },
            fail:function(err){
              console.log(err);
            }
        })
    },
    hiddenCity:function(e){
        this.data['cityVisible'] && this.setData({
            cityVisible:'',
            cityX:'100%'
        });
    },
    goBack:function(e){
        let target = e.target;
        this.setData({
            selectedCity:{
                id:target.id,
                name:target.dataset['name']
            }
        });
        wx.setStorage({
            key:this.type,
            data:{
                province:this.data['selectedProvince'],
                city:this.data['selectedCity']
            }
        });
        wx.navigateBack();
    }
})
