var color = [
    "#02afe7",
    "#ffa12e",
    "#00007f", //这个是圆环内的
    "#0bbcb7",
    "#1a9bfc",
    "#7049f0",
];
var dataStyle = {
    normal: {
        label: {
            show: false,
        },
        labelLine: {
            show: false,
        },
        shadowBlur: 40,
        borderWidth: 10,
        shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
    },
};
var placeHolderStyle = {
    normal: {
        color: "#aaaa7f",
        label: {
            show: false,
        },
        labelLine: {
            show: false,
        },
    },
    emphasis: {
        color: "#ffaa00",
    },
};
var placeHolderStyle1 = {
    normal: {
        color: "#f3f3f3", //圆环背景色
        label: {
            show: false,
        },
        labelLine: {
            show: false,
        },
    },
    emphasis: {
        color: "#ff5500",
    },
};
let pieOption = {
    // backgroundColor: '#142058',我刚才回复原先的样子了这个该怎么改太难了
    title: {
        show: false,
        text: "匹配度",
        x: "center",
        y: "center",
        textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#f3f3f3",
        },
    }, 
    tooltip: {
        trigger: "item",
        show: true,
        formatter: "{b} : {d}%", //百分号
        backgroundColor: "rgba(255, 255, 0, 0.1)", // 背景
        padding: [1, 1], //内边距
        extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.1);", //添加阴影
    },
        legend: {
          orient: 'vertical',
          right: '20',
          top: '10%',
          itemGap: 20,
          data: ['未手术 2人', 'RC 9人', 'TURB 12人'],
		  textStyle: {
		    color: '#00ffff', //圆环内的 c业务
		  },
        formatter: function (data) {
            console.log(data)
           console.log('111')
            return data + '%'
          },
        },
    series: [
        {
            name: 'Line 3',
            type: 'pie',
            clockWise: true,
            radius: [15, 25],
            center: ['30%', '50%'],
            itemStyle: dataStyle,
            hoverAnimation: false,
            startAngle: 90,
            data: [
				{
                value: 15, //内圆环的百分之几
                name: '未手术 2人',
                itemStyle: {
                    normal: {
                        color: color[2]
                    }
                },
            },
            {
                value: 80,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle: placeHolderStyle1
            },
            ]
        },
		{
		    name: 'Line 2',
		    type: 'pie',
		    clockWise: true,
		    radius: [41, 30],
		    center: ['30%', '50%'],
		    itemStyle: dataStyle,
		    hoverAnimation: false,
		    startAngle:90,//内圆环的百分之几
		    data: [
				{
		        value: 45,
		        name: 'RC 9人',
		        itemStyle: {
		            normal: {
		                color: color[1]
		            }
		        },
		    },
		    {
		        value: 45,
		        name: '',
		        tooltip: {
		            show: false
		        },
		        itemStyle: placeHolderStyle1
		    },
		    ]
		},
		
		{
		    name: 'Line 1',
		    type: 'pie',
		    clockWise: true,
		    radius: [58,48],
		    center: ['30%', '50%'],
		    itemStyle: dataStyle,
		    hoverAnimation: false,
		    startAngle:80,//内圆环的百分之几
		    data: [
				{
		        value: 45,
		        name: 'TURB 12人',
		        itemStyle: {
		            normal: {
		                color: color[3]
		            }
		        },
		    },
		    {
		        value: 45,
		        name: '',
		        tooltip: {
		            show: false
		        },
		        itemStyle: placeHolderStyle1
		    },
		    ]
		},
    ],
};
export { pieOption };