<template>
  <div>
    <!-- 表格控件 -->
    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="name" slot-scope="text">
        <a href="javascript:;">{{text}}</a>
      </template>
      <template slot="action" slot-scope="text, record">
        <span>
          <a href="javascript:;">Action 一 {{record.name}}</a>
          <a-divider type="vertical" />
          <a href="javascript:;">Delete</a>
          <a-divider type="vertical" />
          <a href="javascript:;" class="ant-dropdown-link">
            More actions
            <a-icon type="down" />
          </a>
        </span>
      </template>
    </a-table>
    <!-- 评论控件 -->
    <div>
      <a-list
        v-if="comments.length"
        :dataSource="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
        itemLayout="horizontal"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- 评论样式 -->
          <a-comment
            :author="item.author"
            :avatar="item.avatar"
            :content="item.content"
            :datetime="item.datetime"
          >
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
              </span>
              <span>
                <a-tooltip title="Dislike">
                  <a-icon
                    type="dislike"
                    :theme="action === 'disliked' ? 'filled' : 'outlined'"
                    @click="dislike"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
              </span>
            </template>
            <a slot="author">Han Solo</a>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
              slot="avatar"
            />
            <p
              slot="content"
            >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
            <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
              <span>{{moment().fromNow()}}</span>
            </a-tooltip>
          </a-comment>
        </a-list-item>
      </a-list>
      <a-comment>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
        <div slot="content">
          <a-form-item>
            <a-input type="textarea" :rows="4" @change="handleChange" :value="value"></a-input>
          </a-form-item>
          <a-formItem>
            <a-button
              htmlType="submit"
              :loading="submitting"
              @click="handleSubmit"
              type="primary"
            >添加评论</a-button>
          </a-formItem>
        </div>
      </a-comment>
    </div>
  </div>
</template>
<script>
// 评论组件引入
import moment from "moment";
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  };
  if (index === 4) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
// table表格数据
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    tel: "0571-22098909",
    phone: 18889898989,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    tel: "0571-22098333",
    phone: 18889898888,
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "Jim Red",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "London No. 2 Lake Park"
  },
  {
    key: "5",
    name: "Jake White",
    age: 18,
    tel: "0575-22098909",
    phone: 18900010002,
    address: "Dublin No. 2 Lake Park"
  }
];
export default {
  data() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        // 根据条件判断列数量
        customRender: (text, row, index) => {
          if (index < 4) {
            return <a href="javascript:;">{text}</a>;
          }
          return {
            children: <a href="javascript:;">{text}</a>,
            attrs: {
              colSpan: 5
            }
          };
        }
      },
      {
        title: "Age",
        dataIndex: "age",
        customRender: renderContent
      },
      {
        title: "Home phone",
        colSpan: 2,
        dataIndex: "tel",
        customRender: (value, row, index) => {
          const obj = {
            children: value,
            attrs: {}
          };
          // 根据数据判断行合并
          if (index === 2) {
            obj.attrs.rowSpan = 2;
          }
          // These two are merged into above cell
          if (index === 3) {
            obj.attrs.rowSpan = 0;
          }
          if (index === 4) {
            obj.attrs.colSpan = 0;
          }
          return obj;
        }
      },
      {
        title: "Phone",
        colSpan: 0,
        dataIndex: "phone",
        customRender: renderContent
      },
      {
        title: "Address",
        dataIndex: "address",
        customRender: renderContent
      }
    ];
    return {
      data,
      columns,
      // 评论控件
      likes: 0,
      dislikes: 0,
      action: null,
      moment,
      // 回复框控件
      comments: [],
      submitting: false,
      value: ""
    };
  },
  methods: {
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true;

      setTimeout(() => {
        this.submitting = false;
        this.comments = [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: this.value,
            datetime: moment().fromNow()
          },
          ...this.comments
        ];
        this.value = "";
      }, 1000);
    },
    handleChange(e) {
      this.value = e.target.value;
    }
  }
};
</script>
