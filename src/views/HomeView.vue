<script setup>
import { ref, onMounted, computed } from 'vue'

const xiaoli = ref()
const start = new Date(2025,1,24,0,0,0,0) // 起始日期 2025-02-24 （不同学期不通用，需按照学期修改）
let now = ref(new Date())
if (now.value.getTime() < start.getTime() || now.value.getTime() > start.getTime() + (1000 * 60 * 60 * 24 * 180)) {
  now.value = new Date(start.getTime() + 1)
}
const dialogVisible = ref(false)
const dialogContent = ref('')
const dialogTitle = ref('通知')

const days = computed(() => {
  return Math.ceil((now.value.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
})
const weeks = computed(() => {
  return Math.ceil(days.value / 7)
})

const chineseList = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '二十一']
onMounted(() => {
  initFunc()
  setInterval(() => location.reload(), 1000 * 60 * 60 * 5)
  addClickFunc()
  initSpecialEvent()
})
const initFunc = (date) => {
  if (date) {
    now.value = date
  }
  const chooseItemOld = document.getElementsByClassName('today')
  if (chooseItemOld?.length) {
    for (let i = 0; i < chooseItemOld.length; i++) {
      chooseItemOld[i].classList.remove('today')
    }
  }
  const trs = document.getElementsByClassName(weeks.value)
  if (trs?.length > 0) {
    trs[0].childNodes?.forEach(item => {
      if (item.innerText === now.value.getDate() + '') {
        const classList = ['today']
        if (!date) { classList.push('real') }
        item.classList.add(...classList)
      }
    })
  }
  document.title = `现在是第${chineseList[weeks.value] || weeks.value}周：：星期${chineseList[now.value.getDay()]}`
}

const addClickFunc = () => {
  const table = xiaoli.value
  table.childNodes?.forEach((tr, week) => {
    tr.childNodes?.forEach((td, days) => {
      const inner = td.innerText - 0 || 'string'
      if (typeof inner === 'number' ) { // 为日期添加点击事件
        td.addEventListener("click", function(){

          // 周数对应的月份 0没用是占位 没有第0周 （不同学期不通用，需按照学期修改）
          const monthList = [0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6]
          let month = monthList[week]

          // 部分周存在跨月 需特殊处理 （不同学期不通用，需按照学期修改）
          if ((week === 6 && inner > 30) || (week === 10 && inner > 27) || (week === 19 && inner > 27)) {
            month -= 1
          } else if ((week === 1 && inner < 3) || (week === 14 && inner < 2)) {
            month += 1
          }
          const day = new Date(start.getFullYear(), month, inner,0,0,1,0)
          initFunc(day)
        })
      }
    })
  })
}

const initSpecialEvent = () => {
  const realNow = new Date()
  if (realNow.getMonth() === 2 && realNow.getDate() === 2) {
    openDialog('警告', '周末期间看什么课程表？！')
  } else if (realNow.getMonth() === 2 && realNow.getDate() > 3 && realNow.getDate() < 7) {
    openDialog('喜报', '这周五没课')
  } else if (realNow.getMonth() === 2 && realNow.getDate() === 8) {
    openDialog('温馨提示', '女神节快乐!')
  } else if (realNow.getMonth() === 3 && realNow.getDate() === 1) {
    openDialog('系统故障', '服务不可用，请刷新重试。')
  } else if (realNow.getMonth() === 3 && realNow.getDate() < 3) {
    openDialog('喜报', '这周清明节放假')
  } else if (realNow.getMonth() === 3 && realNow.getDate() > 3 && realNow.getDate() < 7) {
    openDialog('警告', '清明节放假期间，看什么课程表？！')
  } else if (realNow.getMonth() === 3 && realNow.getDate() > 21 && realNow.getDate() < 25) {
    openDialog('教务通知', '教务通知：下周劳动节，请及时调课')
  } else if (realNow.getMonth() === 3 && realNow.getDate() > 27) {
    openDialog('温馨提示', '这周劳动节放假')
  } else if (realNow.getMonth() === 4 && realNow.getDate() < 6) {
    openDialog('警告', '劳动节放假期间，看什么课程表？！')
  } else if (realNow.getMonth() === 4 && realNow.getDate() === 26) {
    openDialog('通知', '《关于工学院教师不过儿童节的通知》')
  } else if (Math.random() < 0.2) {
    const list = [
      { content: '点击确认按钮，则今日不再提示。', title: '温馨提示' },
      { content: '正在启动中，欢迎使用课表', title: '欢迎' },
      { content: '如果腰部感到不舒畅，起身走走，然后回来，会好很多。', title: '通知' },
      { content: '啊！要给你看什么提示好呢…(翻', title: '提示' },
      { content: '这是一条…啊嚏！…冷知识！', title: '冷知识' },
      { content: '这是一条…烫烫烫烫烫！的热知识。', title: '热知识' },
      { content: '通知：通知：通知：通知：通知：通知：', title: '' },
      { content: '你知道吗？其实通知全都是废话（确信', title: '通知' },
      { content: '不写，懒了', title: '通知' },
      { content: '大家好！这里是温馨提示，那么本次内容就到这啦！谢谢观看！', title: '温馨提示' },
      { content: '你知道吗？通知只是让你除了课表外还有东西可看', title: '通知' },
      { content: '上课久了，一定要记得闭上眼睛休息一会哦~', title: '提示' },
      { content: '这里通知的数量其实很多，有兴趣的可以尝试收集一下。', title: '通知' },
      { content: '竖起大拇指，自信沈工人', title: '温馨提示' },
      { content: '当你在看提示的时候，提示也在看着你', title: '提示' },
      { content: '长时间上课会有引发咽炎的风险哦，注意休息。', title: '温馨提示' },
      { content: '该提示暂未想好', title: '提示' },
      { content: '其实通知还是有正经的，就比如这个', title: '通知' },
    ]
    const item = list[Math.floor(Math.random() * list.length)]
    openDialog(item.title, item.content)
  }
    // openDialog('温馨提示', '给老公发送爱心可以获得红包一个。')
    // openDialog('加油', '最后一课，打起精神来，你是最棒的。')
    // openDialog('通知', '这是本学期最后一条通知，下学期见。')
    // openDialog('寒假', '这日子是越来越有盼头了')
    // openDialog('温馨提示', '大雪节气，多喝热水。')
    // openDialog('提示', '期末啦，大家都长大啦ww')
    // openDialog('提示', '明天是感恩节。♫ 感恩的心~~ ♫ 感谢有你~~')
}

const openDialog = (title, content) => {
  const nowStrLoc = `${now.value.getMonth()}-${now.value.getDate()}`
  if (localStorage.getItem('todayShown') === nowStrLoc) return false
  dialogVisible.value = true
  dialogTitle.value = title
  dialogContent.value = content
}
const handleClose = () => {
  const nowStrLoc = `${now.value.getMonth()}-${now.value.getDate()}`
  localStorage.setItem('todayShown', nowStrLoc)
  dialogVisible.value = false
}
</script>

<template>
<div class="kebiao-content">
  <div class="title">现在是第 <span>{{ chineseList[weeks] || weeks }}</span> 周</div>
  <div style="text-align:center">{{ `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日 &nbsp; &nbsp; &nbsp; &nbsp; 星期${chineseList[now.getDay()]}` }}</div><br>
  <div class="card-content">
    <el-card class="box-card" body-class='card-body'>
      <table class="kebiao-table" cellspacing="0">
        <tr>
          <td class="col-title"></td>
          <td width="19%" :class="`${now.getDay() === 1 ? 'nowweek' : ''}`">周一</td>
          <td width="19%" :class="`${now.getDay() === 2 ? 'nowweek' : ''}`">周二</td>
          <td width="19%" :class="`${now.getDay() === 3 ? 'nowweek' : ''}`">周三</td>
          <td width="19%" :class="`${now.getDay() === 4 ? 'nowweek' : ''}`">周四</td>
          <td width="19%" :class="`${now.getDay() === 5 ? 'nowweek' : ''}`">周五</td>
        </tr>
        <!-- 一二节 -->
        <tr>
          <el-tooltip effect="light" content="08:10 - 08:55" placement="right">
            <td>1</td>
          </el-tooltip>
          <td rowspan="2" :class="`${weeks > 19 || weeks === 16 ? 'gray' : ''}`">
            <div>{{ weeks < 16 ? (weeks > 11 ? 'Web前端实验' : 'Web前端开发') : 'BS系统开发实训'}}</div>
            <div>{{ weeks < 16 ? '计算中心2区' : '计算中心8区' }}</div>
            <div>{{ weeks < 16 ? '专升本4-5班' : '专升本3班' }}</div>
            <div>{{ weeks < 16 ? (weeks > 11 ? '12-15周' : '1-11周') : '17-19周' }}</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || weeks < 17 ? 'gray' : ''}`">
            <div>BS系统开发实训</div>
            <div>计算中心8区</div>
            <div>专升本3班</div>
            <div>17-19周</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 19 && weeks !== 17 ? 'gray' : ''}`">
            <div>监考</div>
            <div>{{ weeks < 18 ? '7406' : '7202' }}</div>
            <div>{{ weeks < 18 ? '6月19日' : '7月03日' }}</div>
            <div>{{ weeks < 18 ? '9-11点' : '9点-10:40' }}</div>
          </td>
          <td rowspan="2" :class="`${(weeks > 1 && weeks < 17) || weeks > 19 ? 'gray' : ''}`">
            <div>{{ weeks < 2 ? 'Web前端开发' : 'BS系统开发实训'}}</div>
            <div>{{ weeks < 2 ? '计算中心2区' : '计算中心8区' }}</div>
            <div>{{ weeks < 2 ? '专升本4-5班' : '专升本3班' }}</div>
            <div>{{ weeks < 2 ? '1周' : '17-19周' }}</div>
          </td>
        </tr>
        <tr>
          <el-tooltip effect="light" content="09:00 - 09:45" placement="right">
            <td>2</td>
          </el-tooltip>
        </tr>
        <!-- 三四节 -->
        <tr>
          <el-tooltip effect="light" content="10:05 - 10:50" placement="right">
            <td>3</td>
          </el-tooltip>
          <td rowspan="2" :class="`${weeks > 19 || weeks === 16 ? 'gray' : ''}`">
            <div>{{ weeks < 16 ? (weeks > 11 ? 'Web前端实验' : 'Web前端开发') : 'BS系统开发实训'}}</div>
            <div>{{ weeks < 16 ? '计算中心2区' : '计算中心8区' }}</div>
            <div>{{ weeks < 16 ? '专升本7-8班' : '专升本3班' }}</div>
            <div>{{ weeks < 16 ? (weeks > 11 ? '12-15周' : '1-11周') : '17-19周' }}</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || weeks < 17 ? 'gray' : ''}`">
            <div>BS系统开发实训</div>
            <div>计算中心8区</div>
            <div>专升本3班</div>
            <div>17-19周</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || weeks < 17 ? 'gray' : ''}`">
            <div>BS系统开发实训</div>
            <div>计算中心8区</div>
            <div>专升本3班</div>
            <div>17-19周</div>
          </td>
        </tr>
        <tr>
          <el-tooltip effect="light" content="10:55 - 11:40" placement="right">
            <td>4</td>
          </el-tooltip>
        </tr>
        <!-- 五六节 -->
        <tr>
          <el-tooltip effect="light" content="13:20 - 14:05" placement="right">
            <td>5</td>
          </el-tooltip>
          <td rowspan="2" :class="`${weeks !== 17 ? 'gray' : ''}`">
            <div>监考</div>
            <div>华为102-数通A</div>
            <div>6月16日</div>
            <div>14-16点</div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || weeks < 17 ? 'gray' : ''}`">
            <div>BS系统开发实训</div>
            <div>计算中心8区</div>
            <div>专升本3班</div>
            <div>17-19周</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${(weeks > 19 || weeks < 17) && weeks !== 15 ? 'gray' : ''}`">
            <div>{{ weeks < 16 ? '监考' : 'BS系统开发实训'}}</div>
            <div>{{ weeks < 16 ? '计算中心2区' : '计算中心8区' }}</div>
            <div>{{ weeks < 16 ? '6月5日' : '专升本3班' }}</div>
            <div>{{ weeks < 16 ? '12:10-13:10' : '17-19周' }}</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 1 ? 'gray' : ''}`">
            <div>Web前端开发</div>
            <div>计算中心2区</div>
            <div>专升本7-8班</div>
            <div>1周</div>
          </td>
        </tr>
        <tr>
          <el-tooltip effect="light" content="14:10 - 14:55" placement="right">
            <td>6</td>
          </el-tooltip>
        </tr>
        <!-- 七八节 -->
        <tr>
          <el-tooltip effect="light" content="15:15 - 15:55" placement="right">
            <td>7</td>
          </el-tooltip>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div>培训</div>
            <div>信息310</div>
            <div>-</div>
            <div>3周</div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || weeks < 17 ? 'gray' : ''}`">
            <div>BS系统开发实训</div>
            <div>计算中心8区</div>
            <div>专升本3班</div>
            <div>17-19周</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 19 || (weeks < 17 && weeks !== 15) ? 'gray' : ''}`">
            <div>{{ weeks < 16 ? '监考' : (weeks < 18 ? '监考/BS实训': 'BS系统开发实训') }}</div>
            <div>{{ weeks < 16 ? '华为205-鸿蒙B' : (weeks < 18 ? '华为403-鸿蒙D': '计算中心8区') }}</div>
            <div>{{ weeks < 16 ? '6月5日' : (weeks < 18 ? '6月19日': '专升本3班') }}</div>
            <div>{{ weeks < 16 ? '14-16点' : (weeks < 18 ? '17:20-19:20': '17-19周') }}</div>
          </td>
          <td rowspan="2">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
        </tr>
        <tr>
          <el-tooltip effect="light" content="16:00 - 16:40" placement="right">
            <td>8</td>
          </el-tooltip>
        </tr>
      </table>
    </el-card>
    <div class="center-block"><br></div>
    <el-card class="box-card" body-class='card-body'>
      <table class="xiaoli-table" ref="xiaoli" cellspacing="0">
        <tr class="last-tr">
          <td class="br">月份</td>
          <td class="br">教学周</td>
          <td>周一</td><td>周二</td><td>周三</td><td>周四</td><td>周五</td><td>周六</td><td>周日</td>
        </tr>

        <tr class="last-tr 1">
          <td class="br">二月</td>
          <td class="br">一</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>1</td><td>2</td>
        </tr>

        <tr class="2">
          <td rowspan="4" class="bb br">三月</td>
          <td class="br">二</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td>
        </tr>
        <tr class="3">
          <td class="br">三</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td>
        </tr>
        <tr class="4">
          <td class="br">四</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td>
        </tr>
        <tr class="last-tr 5">
          <td class="br">五</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td>
        </tr>

        <tr class="6">
          <td rowspan="4" class="bb br">四月</td>
          <td class="br">六</td><td>31</td><td>1</td><td>2</td><td>3</td><td class="red">4</td><td>5</td><td>6</td>
        </tr>
        <tr class="7">
          <td class="br">七</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td>
        </tr>
        <tr class="8">
          <td class="br">八</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td>
        </tr>
        <tr class="last-tr 9">
          <td class="br">九</td><td class="black">21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td class="black">27</td>
        </tr>

        <tr class="10">
          <td rowspan="5" class="bb br">五月</td>
          <td class="br">十</td><td>28</td><td>29</td><td>30</td><td class="red">1</td><td class="red">2</td><td class="red">3</td><td>4</td>
        </tr>
        <tr class="11">
          <td class="br">十一</td><td class="red">5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td class="black">11</td>
        </tr>
        <tr class="12">
          <td class="br">十二</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td>
        </tr>
        <tr class="13">
          <td class="br">十三</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td>
        </tr>
        <tr class="last-tr 14">
          <td class="br">十四</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>1</td>
        </tr>

        <tr class="15">
          <td rowspan="4" class="bb br">六月</td>
          <td class="br">十五</td><td class="red">2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
        </tr>
        <tr class="16">
          <td class="br">十六</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td>
        </tr>
        <tr class="17">
          <td class="br">十七</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
        </tr>
        <tr class="last-tr 18">
          <td class="br">十八</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td>
        </tr>

        <tr class="19">
          <td rowspan="3" class="br">七月</td>
          <td class="br">十九</td><td>30</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>
        </tr>
        <tr class="20">
          <td class="br">二十</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td>
        </tr>
        <tr class="21">
          <td class="br">二十一</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td>
        </tr>
      </table>
    </el-card>
  </div>
  <div><br></div>
</div>
<el-dialog v-model="dialogVisible" :title='dialogTitle' :close-on-click-modal='false'>
  <span>{{ dialogContent }}</span>
  <template #footer>
    <div class="dialog-footer">
      <el-button type="primary" @click="handleClose">确认</el-button>
    </div>
  </template>
</el-dialog>
</template>

<style lang="scss">
.kebiao-content{
  padding: 8px;
  font-size: 14px;
  background-color: rgb(253, 246, 236);
  min-height: calc(100vh - 16px);
  .title{
    color: #606266;
    font-size: 20px;
    text-align: center;
    padding: 8px;
    height: 31px;
    line-height: 31px;
    span{
      font-weight: bold;
      color: #E6A23C;
    }
  }
  .box-card{
    margin: 0 auto;
    max-width: 600px;
    .card-body{
      padding: 8px;
    }
  }
  .kebiao-table {
    font-size: 12px;
    color: #606266;
    width: 100%;
    border-top: 1px solid #DCDFE6;
    border-left: 1px solid #DCDFE6;
    .nowweek {
      background-color: #E6A23C;
      color: #FFF;
    }
    .gray{
      color: #bbb;
    }
    td {
      text-align: center;
      border-right: 1px solid #DCDFE6;
      border-bottom: 1px solid #DCDFE6;
      padding: 4px 1px;
    }
  }
  .xiaoli-table{
    color: #606266;
    width: 100%;
    border: 1px solid #DCDFE6;
    text-align: center;
    line-height: 28px;
    .last-tr td, .bb{
      border-bottom: 1px solid #DCDFE6;
    }
    .br{
      border-right: 1px solid #DCDFE6;
    }
    tr {
      :nth-last-child(1), :nth-last-child(2), .red{
        color: #F56C6C;
      }
      .black{
        color: #606266;
      }
      td{
        cursor: pointer;
      }
      .real{
        background-color: #d1edc4;
      }
      .today{
        background-color: #E6A23C;
        color: #FFF;
      }
    }
  }
}

@media (min-width: 1200px) {
  .kebiao-content{
    .card-content{
      margin: 0 auto;
      max-width: 1300px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .box-card{
      width: 600px;
      .card-body{
        padding: 20px;
      }
    }
    .kebiao-table {
      font-size: 12px;
      td > div{
        margin-bottom: 4px;
      }
    }
  }
}
</style>