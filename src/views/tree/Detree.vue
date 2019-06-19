<template>
  <div>
    <el-tree
      :data="classifyList"
      node-key="id"
      highlight-current
      :allow-drop="collapse"
      @node-drop="sort"
      draggable
    >
      <span class="custom-tree-node" slot-scope="{ node,data}">
        <span class="custom-tree-node-name">{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="$router.push({name:'goodsClassifySecondlist',params:{id:node.data.id,name:node.data.name}});"
          >查看二级分类</el-button>
          <el-button type="text" size="mini" @click="updateFirst=true;updateNode = node.data;">编辑</el-button>
          <el-button type="text" size="mini" @click="stick(node.data.id)">置顶</el-button>
          <el-button
            style="color:#EE6D34"
            type="text"
            size="mini"
            @click="deleteFirst=true;deleteId = node.data.id;"
          >删除</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classifyList: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1'
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1'
            },
            {
              id: 6,
              label: 'Level two 2-2'
            }
          ]
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1'
            },
            {
              id: 8,
              label: 'Level two 3-2'
            }
          ]
        }
      ]
    }
  },
  watch: {},
  methods: {
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