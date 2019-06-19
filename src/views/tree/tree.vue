<template>
  <div class="tree">
    <el-tree
      :data="data4"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent"
      :allow-drop="collapse"
      @node-drop="sort"
      draggable
      accordion
    ></el-tree>
    <!-- 修改节点名称的提示框 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000

export default {
  data() {
    return {
      centerDialogVisible: false, //弹框
      data4: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  methods: {
    append(data) {
      const newChild = { id: id++, label: 'newNode', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    remove(node, data) {
      console.log(node, data)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    nodeEdit(node, data) {
      console.log(node.label)
      this.centerDialogVisible = true
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.append(data)}
            >
              新增
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.nodeEdit(data)}
            >
              修改
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      )
    },
    // 分类排序
    collapse(moveNode, inNode, type) {
      if (moveNode.level == 1 && inNode.level == 1) {
        // 四种情况
        if (moveNode.nextSibling == undefined) {
          return type == 'prev'
        } else if (inNode.nextSibling == undefined) {
          return type == 'next'
        } else if (moveNode.nextSibling.id !== inNode.id) {
          return type == 'prev'
        } else {
          return type == 'next'
        }
      }
      //是否为同级下的子节点
      if (
        moveNode.level == 2 &&
        inNode.level == 2 &&
        moveNode.parent.id == inNode.parent.id
      ) {
        // 四种情况
        if (moveNode.nextSibling == undefined) {
          return type == 'prev'
        } else if (inNode.nextSibling == undefined) {
          return type == 'next'
        } else if (moveNode.nextSibling.id !== inNode.id) {
          return type == 'prev'
        } else {
          return type == 'next'
        }
      }
    },
    sort(e) {
      console.log(e)
    }
  }
}
</script>

