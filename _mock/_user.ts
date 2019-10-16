import { MockRequest } from '@delon/mock';

const list: any[] = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function genData(params: any) {
  let ret = [...list];
  const pi = +params.pi;
  const ps = +params.ps;
  const start = (pi - 1) * ps;

  if (params.no) {
    ret = ret.filter(data => data.no.indexOf(params.no) > -1);
  }

  return { total: ret.length, list: ret.slice(start, ps * pi) };
}

function saveData(id: number, value: any) {
  const item = list.find(w => w.id === id);
  if (!item) return { msg: '无效用户信息' };
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const USERS = {
  '/user': (req: MockRequest) => genData(req.queryString),
  '/user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /user/:id': (req: MockRequest) => saveData(+req.params.id, req.body),
  '/user/current': {
    name: 'Cipchk',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'cipchk@qq.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注撩妹',
      },
      {
        key: '2',
        label: '帅~',
      },
      {
        key: '3',
        label: '通吃',
      },
      {
        key: '4',
        label: '专职后端',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    country: 'China',
    geographic: {
      province: {
        label: '上海',
        key: '330000',
      },
      city: {
        label: '市辖区',
        key: '330100',
      },
    },
    address: 'XX区XXX路 XX 号',
    phone: '你猜-你猜你猜猜猜',
  },
  'POST /user/avatar': 'ok',
  'POST /login/account': (req: MockRequest) => {
    const data = req.body;
    if (!(data.userName === 'admin' || data.userName === 'user') || data.password !== 'ng-alain.com') {
      return { msg: `Invalid username or password（admin/ng-alain.com）` };
    }
    return {
      msg: 'ok',
      user: {
        token: '123456789',
        name: data.userName,
        email: `${data.userName}@qq.com`,
        id: 10000,
        time: +new Date(),
      },
    };
  },
  'POST /register': {
    msg: 'ok',
  },
  'GET /rule': {
    data: [
      {
        active: true,
        name: 'This is panel header 1',
        questions: [
          {
            controlType: 'input',  //元素类型 输入框
            des: '剑网一是西山居制作剑网一是西山居制作剑网一是西山居制作剑网一是西山居制作剑网一是西山居制作剑网一是西山居制作剑网一是西山居制作',
            key: 'one',      //表单提交 对应元素的key
            label: '剑网一',  //元素名称
            value: '真好玩',  //元素默认值  可空
            order: 1,          //元素在表单中的顺序位置
          },
          {
            controlType: 'input',
            key: 'two',
            label: '剑网二',
            value: '真的好玩',
            order: 2
          },
          {
            controlType: 'input',
            key: 'three',
            label: '剑网三',
            value: '',
            order: 3
          },
          {
            controlType: 'label',  //元素类型 只读文本
            key: 'label',
            label: '文本',  //元素名称
            value: '只读文本内容文本文本文本文本文本文本文本文本文本文本文本文本文本文本文',  //元素默认值  可空
            order: 8,          //元素在表单中的顺序位置
          },
          {
            controlType: 'textarea',
            key: 'text',
            label: '文本内容',
            value: '',
            order: 10
          },
          {
            controlType: 'inputgroup',
            key: 'inputgroup',
            label: '输入组',
            value: ['ff', 'ffff'],
            order: 9
          },
          {
            controlType: 'input',
            key: 'hfys',
            label: '汉风雅颂',
            order: 4
          },
          {
            controlType: 'select', //下拉框
            key: 'xsj',
            label: '西山居',
            value: '3',       //默认值 可空
            options: [        //下拉列表中的值
              { key: '1', value: '剑网一' },
              { key: '2', value: '剑网二' },
              { key: '3', value: '剑网三' },
              { key: '4', value: '剑网四' }
            ],
            order: 5
          },
          {
            controlType: 'checkbox', //多选框
            key: 'server',
            label: '服务器',
            options: [  //多选框内容
              { label: '服务器1', value: '1', checked: true },//默认值 可空
              { label: '服务器2', value: '2', checked: true },//默认值 可空
              { label: '服务器3', value: '3' },
              { label: '服务器4', value: '4' }
            ],
            order: 6
          },
          {
            controlType: 'radio',  //单选框
            key: 'payway',
            label: '充值方式',
            value: '2',    //默认值 可空
            options: [    //单选框内容
              { label: '微信', value: '1' },
              { label: '支付宝', value: '2' },
              { label: '银联', value: '3' },
              { label: '充值卡', value: '4' }
            ],
            order: 7
          }
        ],
        key: 'panel1',
        childPanel: [
          {
            active: true,
            key: 'panel1-1',
            name: 'This is panel header 1-1',
            questions: [
              {
                controlType: 'input',  //元素类型 输入框
                key: 'one',      //表单提交 对应元素的key
                label: '剑网一',  //元素名称
                value: '真好玩',  //元素默认值  可空
                order: 1,          //元素在表单中的顺序位置
              },
              {
                controlType: 'input',
                key: 'two',
                label: '剑网二',
                value: '真的好玩',
                order: 2
              },
              {
                controlType: 'input',
                key: 'three',
                label: '剑网三',
                value: '',
                order: 3
              },
              {
                controlType: 'textarea',
                key: 'text',
                label: '文本内容',
                value: '',
                order: 8
              },
              {
                controlType: 'inputgroup',
                key: 'inputgroup',
                label: '输入组',
                order: 9
              },
              {
                controlType: 'input',
                key: 'hfys',
                label: '汉风雅颂',
                order: 4
              },
              {
                controlType: 'select', //下拉框
                key: 'xsj',
                label: '西山居',
                value: '3',       //默认值 可空
                options: [        //下拉列表中的值
                  { key: '1', value: '剑网一' },
                  { key: '2', value: '剑网二' },
                  { key: '3', value: '剑网三' },
                  { key: '4', value: '剑网四' }
                ],
                order: 5
              },
              {
                controlType: 'checkbox', //多选框
                key: 'server',
                label: '服务器',
                options: [  //多选框内容
                  { label: '服务器1', value: '1', checked: true },//默认值 可空
                  { label: '服务器2', value: '2', checked: true },//默认值 可空
                  { label: '服务器3', value: '3' },
                  { label: '服务器4', value: '4' }
                ],
                order: 6
              },
              {
                controlType: 'radio',  //单选框
                key: 'payway',
                label: '充值方式',
                value: '2',    //默认值 可空
                options: [    //单选框内容
                  { label: '微信', value: '1' },
                  { label: '支付宝', value: '2' },
                  { label: '银联', value: '3' },
                  { label: '充值卡', value: '4' }
                ],
                order: 7
              }
            ],
          },
          {
            active: true,
            name: 'This is panel header 1-2',
            key: 'panel1-2',
            childPanel: [
              {
                active: true,
                name: 'This is panel header 1-2-1',
                key: 'panel1-2-1',
                questions: [
                  {
                    controlType: 'input',  //元素类型 输入框
                    key: 'one',      //表单提交 对应元素的key
                    label: '剑网一',  //元素名称
                    value: '真好玩',  //元素默认值  可空
                    order: 1,          //元素在表单中的顺序位置
                  },
                  {
                    controlType: 'input',
                    key: 'two',
                    label: '剑网二',
                    value: '真的好玩',
                    order: 2
                  },
                  {
                    controlType: 'input',
                    key: 'three',
                    label: '剑网三',
                    value: '',
                    order: 3
                  },
                  {
                    controlType: 'textarea',
                    key: 'text',
                    label: '文本内容',
                    value: '',
                    order: 8
                  },
                  {
                    controlType: 'inputgroup',
                    key: 'inputgroup',
                    label: '输入组',
                    value: ['eee', 'www', 'ee', 'www'],
                    order: 9
                  },
                  {
                    controlType: 'input',
                    key: 'hfys',
                    label: '汉风雅颂',
                    order: 4
                  },
                  {
                    controlType: 'select', //下拉框
                    key: 'xsj',
                    label: '西山居',
                    value: '3',       //默认值 可空
                    options: [        //下拉列表中的值
                      { key: '1', value: '剑网一' },
                      { key: '2', value: '剑网二' },
                      { key: '3', value: '剑网三' },
                      { key: '4', value: '剑网四' }
                    ],
                    order: 5
                  },
                  {
                    controlType: 'checkbox', //多选框
                    key: 'server',
                    label: '服务器',
                    options: [  //多选框内容
                      { label: '服务器1', value: '1', checked: true },//默认值 可空
                      { label: '服务器2', value: '2', checked: true },//默认值 可空
                      { label: '服务器3', value: '3' },
                      { label: '服务器4', value: '4' }
                    ],
                    order: 6
                  },
                  {
                    controlType: 'radio',  //单选框
                    key: 'payway',
                    label: '充值方式',
                    value: '2',    //默认值 可空
                    options: [    //单选框内容
                      { label: '微信', value: '1' },
                      { label: '支付宝', value: '2' },
                      { label: '银联', value: '3' },
                      { label: '充值卡', value: '4' }
                    ],
                    order: 7
                  }
                ],
              },
              {
                active: false,
                name: 'This is panel header 1-2-2',
                key: 'panel1-2-2',
              }
            ]
          },

        ]
      },
      {
        key: 'panel2',
        name: 'This is panel header 2',
      },
      {
        key: 'panel3',
        name: 'This is panel header 3',
      }
    ]
  }
};
