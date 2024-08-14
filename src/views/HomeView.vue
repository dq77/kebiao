<script setup>
import { ref, onMounted, computed } from 'vue'

const xiaoli = ref()
const start = new Date(2024,7,26,0,0,0,0) // 起始日期 2024-08-26 （不同学期不通用，需按照学期修改）
let now = ref(new Date())
if (now.value.getTime() < start.getTime()) {
  now.value = new Date(2024,7,26,1,0,0,0) // 比起始日期多一小时（不同学期不通用，需按照学期修改）
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
          const monthList = [0, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12]
          let month = monthList[week]

          // 部分周存在跨月 需特殊处理 （不同学期不通用，需按照学期修改）
          if ((week === 6 && inner > 29) || (week === 19 && inner > 29)) {
            month -= 1
          } else if ((week === 1 && inner < 2) || (week === 10 && inner < 4) || (week === 14 && inner < 2)) {
            month += 1
          }
          const day = new Date(2024, month, inner,0,0,1,0)
          initFunc(day)
        })
      }
    })
  })
}

const initSpecialEvent = () => {
  const realNow = new Date()
  if (realNow.getMonth() === 7 && realNow.getDate() === 27) {
    openDialog('温馨提示', '点击确认按钮，则今日不再提示。')
  } else if (realNow.getMonth() === 7 && realNow.getDate() === 28) {
    openDialog('欢迎', '正在启动中，欢迎使用课表')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 10) {
    openDialog('温馨提示', '教师节快乐!')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 11) {
    openDialog('温馨提示', '假如，我是说假如，这周六是工作日…')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 13) {
    openDialog('通知', '上次看到这条通知还是在上次')
  } else if (realNow.getMonth() === 8 && realNow.getDate() > 14 && realNow.getDate() < 18) {
    openDialog('警告', '中秋节放假期间，看什么课程表？！')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 18) {
    openDialog('通知', '你知道吗？通知只是让你除了课表外还有东西可看')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 20) {
    openDialog('提示', '上课久了，一定要记得闭上眼睛休息一会哦~')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 24) {
    openDialog('通知', '这里通知的数量其实很多，有兴趣的可以尝试收集一下。')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 25) {
    openDialog('教务通知', '教务通知：下周国庆节，请及时调课')
  } else if (realNow.getMonth() === 8 && realNow.getDate() === 27) {
    openDialog('温馨提示', '竖起大拇指，自信沈工人')
  } else if (realNow.getMonth() === 9 && realNow.getDate() < 8) {
    openDialog('警告', '国庆节放假期间，看什么课程表？！')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 9) {
    openDialog('提示', '当你在看提示的时候，提示也在看着你')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 11) {
    openDialog('温馨提示', '长时间上课会有引发咽炎的风险哦，注意休息。')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 16) {
    openDialog('提示', '该提示暂未想好')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 18) {
    openDialog('通知', '其实通知还是有正经的，就比如这个')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 22) {
    openDialog('温馨提示', '大家好！这里是温馨提示，那么本次内容就到这啦！谢谢观看！')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 25) {
    openDialog('通知', '不写，懒了')
  } else if (realNow.getMonth() === 9 && realNow.getDate() === 29) {
    openDialog('通知', '你知道吗？其实通知全都是废话（确信')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 1) {
    openDialog('', '通知：通知：通知：通知：通知：通知：')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 5) {
    openDialog('热知识', '这是一条…烫烫烫烫烫！的热知识。')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 8) {
    openDialog('冷知识', '这是一条…啊嚏！…冷知识！')
  } else if (realNow.getMonth() === 10 && realNow.getDate() > 10 && realNow.getDate() < 16) {
    openDialog('警告', '本周没课，看什么课程表？！')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 19) {
    openDialog('温馨提示', '当你在觉得诸事不顺的时候，看看现在的能力，比起刚入行的时候，是不是提高了很多？现在也是哦，你一直都在成长')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 22) {
    openDialog('提示', '啊！要给你看什么提示好呢…(翻')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 27) {
    openDialog('提示', '明天是感恩节。♫ 感恩的心~~ ♫ 感谢有你~~')
  } else if (realNow.getMonth() === 10 && realNow.getDate() === 29) {
    openDialog('通知', '如果腰部感到不舒畅，起身走走，然后回来，会好很多。')
  } else if (realNow.getMonth() === 11 && realNow.getDate() === 3) {
    openDialog('提示', '期末啦，大家都长大啦ww')
  } else if (realNow.getMonth() === 11 && realNow.getDate() === 6) {
    openDialog('温馨提示', '大雪节气，多喝热水。')
  } else if (realNow.getMonth() === 11 && realNow.getDate() === 10) {
    openDialog('寒假', '这日子是越来越有盼头了')
  } else if (realNow.getMonth() === 11 && realNow.getDate() === 11) {
    openDialog('通知', '这是本学期最后一条通知，下学期见。')
  } else if (realNow.getMonth() === 11 && realNow.getDate() === 13) {
    openDialog('加油', '最后一课，打起精神来，你是最棒的。')
  }
    // openDialog('日程提醒', '系统提示您，请给老公订生日蛋糕。')
    // openDialog('温馨提示', '给老公发送爱心可以获得红包一个。')
    // openDialog('通知', '《关于工学院教师不过儿童节的通知》')
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
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 16 || (weeks === 12) ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>{{ weeks < 12 ? '计算中心9区' : '7301'}}</div>
            <div>23计科5班</div>
            <div>{{ weeks < 12 ? '1-11周' : '13-16周'}}</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 5 ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7210</div>
            <div>23计科5班</div>
            <div>1-5周</div>
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
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks < 13 || weeks > 16 ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7301</div>
            <div>23计科7班</div>
            <div>13-16周</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 16 || (weeks === 12) ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7210</div>
            <div>23计科6班</div>
            <div>{{ weeks < 12 ? '1-11周' : '13-16周'}}</div>
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
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 16 || (weeks > 5 && weeks < 13) ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7406</div>
            <div>23计科6班</div>
            <div>{{ weeks < 6 ? '1-5周' : '13-16周'}}</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 16 || (weeks < 13 && weeks > 5) ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7406</div>
            <div>23计科7班</div>
            <div>{{ weeks < 6 ? '1-5周' : '13-16周'}}</div>
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
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 11 ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7406</div>
            <div>23计科7班</div>
            <div>1-11周</div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks !== 3 ? 'gray' : ''}`">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </td>
          <td rowspan="2" :class="`${weeks > 16 || weeks < 13 ? 'gray' : ''}`">
            <div>数据结构</div>
            <div>7406</div>
            <div>23计科5班</div>
            <div>13-16周</div>
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
          <td class="br">八月</td>
          <td class="br">一</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>1</td>
        </tr>

        <tr class="2">
          <td rowspan="4" class="bb br">九月</td>
          <td class="br">二</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
        </tr>
        <tr class="3">
          <td class="br">三</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td class="black">14</td><td>15</td>
        </tr>
        <tr class="4">
          <td class="br">四</td><td class="red">16</td><td class="red">17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
        </tr>
        <tr class="last-tr 5">
          <td class="br">五</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td class="black">29</td>
        </tr>

        <tr class="6">
          <td rowspan="5" class="bb br">十月</td>
          <td class="br">六</td><td>30</td><td class="red">1</td><td class="red">2</td><td class="red">3</td><td class="red">4</td><td class="red">5</td><td>6</td>
        </tr>
        <tr class="7">
          <td class="br">七</td><td class="red">7</td><td>8</td><td>9</td><td>10</td><td>11</td><td class="black">12</td><td>13</td>
        </tr>
        <tr class="8">
          <td class="br">八</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td>
        </tr>
        <tr class="9">
          <td class="br">九</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td>
        </tr>
        <tr class="last-tr 10">
          <td class="br">十</td><td>28</td><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td>
        </tr>

        <tr class="11">
          <td rowspan="4" class="bb br">十一月</td>
          <td class="br">十一</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td>
        </tr>
        <tr class="12">
          <td class="br">十二</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td>
        </tr>
        <tr class="13">
          <td class="br">十三</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td>
        </tr>
        <tr class="last-tr 14">
          <td class="br">十四</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>1</td>
        </tr>

        <tr class="15">
          <td rowspan="4" class="bb br">十二月</td>
          <td class="br">十五</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td>
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
          <td rowspan="3" class="br">一月</td>
          <td class="br">十九</td><td>30</td><td>31</td><td class="red">1</td><td>2</td><td>3</td><td>4</td><td>5</td>
        </tr>
        <tr class="20">
          <td class="br">二十</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td>
        </tr>
        <tr class="21">
          <td class="br">二十一</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td>
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
  .title{
    color: #606266;
    font-size: 20px;
    text-align: center;
    padding: 8px;
    height: 31px;
    line-height: 31px;
    span{
      font-weight: bold;
      color: #409EFF;
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
      background-color: #409EFF;
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
        background-color: #409EFF;
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