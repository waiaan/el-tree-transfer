<template>
  <div class="container mx-auto flex justify-between el-tree-transfer">
    <div class="flex-1 left content">
      <div>
        <el-input v-model="leftSearchWord" suffix-icon="el-icon-search" size="medium"></el-input>
      </div>
      <div class="mt-5 rounded-md border p-1">
        <el-tree :data="data" :node-key="nodeKey" v-bind="leftTreeProps" v-on="$listeners" @check="onLeftCheck" ref="leftTree" show-checkbox :filter-node-method="(value,data)=>filterNode(value,data,'left')">
        </el-tree>
      </div>
    </div>
    <div class="flex-0 mx-10 justify-center flex flex-col">
        <div v-for="btn in transferButtons.funcs" :key="btn" class="my-1">
          <el-button :type="transferButtons.config[btn].type" :size="transferButtons.config[btn].size" :icon="transferButtons.config[btn].icon"  class="w-full" @click="onTransfer(btn)">
            {{transferButtons.config[btn].text}}
          </el-button>
        </div>
    </div>
    <div class="flex-1 content right">
      <div>
        <el-input v-model="rightSearchWord" suffix-icon="el-icon-search" size="medium"></el-input>
      </div>
      <div class="mt-5 rounded-md border p-1">
         <el-tree  ref="rightTree" :data="selectedData" :node-key="nodeKey"  v-bind="rightTreeProps" highlight-current @node-click="onRightNodeClick" :filter-node-method="(value,data)=>filterNode(value,data,'right')" @node-expand="onRightNodeExpand" @node-collapse="onRightNodeCollapse" :default-expanded-keys="defaultRightExpandedKeys">
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>

const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export default {
  name: 'ElTreeTransfer',
  props: {
    data: {
      type: Array
    },
    options: {
      type: Object
    }
  },
  data () {
    return {
      leftSearchWord: '',
      rightSearchWord: '',
      selectedData: [],
      defaultOptions: {
        nodeKey: '',
        nodePidKey: '',
        leafOnly: true,
        buttons: {
          funcs: ['allRight', 'right', 'left', 'allLeft'],
          config: {
            allRight: {
              type: 'primary',
              icon: '',
              text: '>>',
              size: 'small'
            },
            right: {
              type: 'primary',
              icon: '',
              text: '>',
              size: 'small'
            },
            left: {
              type: 'primary',
              icon: '',
              text: '<',
              size: 'small'
            },
            allLeft: {
              type: 'primary',
              icon: '',
              text: '<<',
              size: 'small'
            }
          }
        },
        leftTreeProps: {

        },
        rightTreeProps: {

        }
      },
      checkedNodes: [],
      rightCurrentData: null,
      defaultRightExpandedKeys: []
    }
  },
  watch: {
    options: {
      handler (val) {
        this.mixinOptions(this.defaultOptions, val)
      },
      deep: true,
      immediate: true
    },
    leftSearchWord (val) {
      this.$refs.leftTree.filter(val)
    },
    rightSearchWord (val) {
      this.$refs.rightTree.filter(val)
    },
    defaultCheckedKeys: {
      handler (val) {
        if (typeOf(val) === 'array' && val.length > 0) {
          this.$nextTick(() => {
            this.getCheckedNodes()
            this.selectedData = this.checkedNodes
          })
        }
      },
      immediate: true
    }
  },
  computed: {
    nodeKey () {
      const nodeKey = this.defaultOptions.nodeKey
      if (nodeKey) {
        return this.defaultOptions.nodeKey
      }
      throw new Error('nodeKey is required')
    },
    nodePidKey () {
      const nodePidKey = this.defaultOptions.nodePidKey
      if (nodePidKey) {
        return this.defaultOptions.nodePidKey
      }
      throw new Error('nodePidKey is required')
    },
    leftTreeProps () {
      return this.defaultOptions.leftTreeProps || {}
    },
    rightTreeProps () {
      return this.defaultOptions.rightTreeProps || {}
    },
    transferButtons () {
      return this.defaultOptions.buttons
    },
    isTransferOnCheck () {
      const { funcs } = this.defaultOptions.buttons
      return (!funcs) || funcs.length === 0
    },
    childrenKey () {
      return this.options.leftTreeProps?.props?.children || 'children'
    },
    leftLabelKey () {
      return this.options.leftTreeProps?.props?.label || 'label'
    },
    rightLabelKey () {
      return this.options.rightTreeProps?.props?.label || 'label'
    },
    leafOnly () {
      return this.defaultOptions.leafOnly
    },
    isNodeDisabled () {
      const disabled = this.defaultOptions.leftTreeProps?.props?.disabled
      if (disabled && typeOf(disabled) === 'function') {
        return disabled
      }
      return () => { return false }
    },
    defaultCheckedKeys () {
      return this.defaultOptions.leftTreeProps?.defaultCheckedKeys
    }
  },
  methods: {
    mixinOptions (origin, newOpt) {
      if (!newOpt) {
        return
      }
      if (typeOf(origin) === 'object') {
        Object.keys(newOpt).forEach(key => {
          if (typeOf(origin[key]) === 'object' || (typeOf(origin[key]) === 'array' && newOpt[key].length > 0)) {
            this.mixinOptions(origin[key], newOpt[key])
          } else {
            origin[key] = newOpt[key]
          }
        })
      } else if (typeOf(origin) === 'array') {
        for (let i = 0; i < newOpt.length; i++) {
          if (typeOf(origin[i]) === 'object' || typeOf(origin[i]) === 'array') {
            this.mixinOptions(origin[i], newOpt[i])
          } else {
            origin[i] = newOpt[i]
          }
        }
      }
    },
    onTransfer (type) {
      this['move' + type.slice(0, 1).toUpperCase() + type.slice(1)]()
    },
    moveAllRight () {
      const childrenKey = this.childrenKey
      const tree = this.$refs.leftTree
      let data = this.data.slice(0)
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        const key = item[this.nodeKey]
        const node = tree.getNode(key);
        (!this.isNodeDisabled(item, node)) && tree.setChecked(key, true)
        if (item[childrenKey] && item[childrenKey].length > 0) {
          data = data.concat(item[childrenKey])
        }
      }
      this.getCheckedNodes()
      this.selectedData = this.checkedNodes
    },
    moveRight () {
      this.selectedData = [].concat(this.checkedNodes)
    },
    moveLeft () {
      const tree = this.$refs.leftTree
      const { nodeKey, defaultRightExpandedKeys } = this
      const key = this.rightCurrentData[nodeKey]
      tree.setChecked(key, false, true)
      this.getCheckedNodes()
      this.selectedData = this.checkedNodes
      const index = defaultRightExpandedKeys.indexOf(key)
      if (index !== -1) {
        defaultRightExpandedKeys.splice(index, 1)
      }
    },
    moveAllLeft () {
      const keys = this.$refs.leftTree.getCheckedKeys()
      keys.forEach(key => {
        this.$refs.leftTree.setChecked(key, false)
      })
      this.selectedData = []
      this.defaultRightExpandedKeys = []
    },
    getCheckedNodes () {
      const tree = this.$refs.leftTree
      this.checkedNodes = []
      if (this.leafOnly) {
        this.checkedNodes = tree.getCheckedNodes(true)
      } else {
        const checkedDatas = tree.getCheckedNodes(false, true)
        this.checkedNodes = this.createCheckedDataTree(checkedDatas)
      }
    },
    createCheckedDataTree (datas) {
      datas = JSON.parse(JSON.stringify(datas))
      const { childrenKey, nodeKey, nodePidKey } = this
      const tree = []
      const map = {}
      for (let i = 0; i < datas.length; i++) {
        if (childrenKey in datas[i]) {
          datas[i][childrenKey] = []
        }
      }
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i]
        const id = data[nodeKey]
        map[id] = data
      }
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i]
        const pid = data[nodePidKey]
        if (!pid) {
          tree.push(data)
        } else {
          map[pid][childrenKey].push(data)
        }
      }
      return tree
    },
    onLeftCheck () {
      this.getCheckedNodes()
      if (this.isTransferOnCheck) {
        this.selectedData = this.checkedNodes
      }
    },
    onRightNodeClick (data) {
      this.rightCurrentData = data
    },
    filterNode (value, data, tree) {
      if (!value) return true
      return data[this[tree + 'LabelKey']].indexOf(value) !== -1
    },
    onRightNodeExpand (data) {
      const { nodeKey, defaultRightExpandedKeys } = this
      defaultRightExpandedKeys.push(data[nodeKey])
    },
    onRightNodeCollapse (data) {
      const { nodeKey, defaultRightExpandedKeys } = this
      defaultRightExpandedKeys.splice(defaultRightExpandedKeys.indexOf(data[nodeKey]), 1)
    },
    getSelectedData () {
      return this.selectedData
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button--primary {
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>
