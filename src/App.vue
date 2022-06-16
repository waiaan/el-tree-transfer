<template>
  <div id="app">
    <el-tree-transfer  :data="data" :options="options"></el-tree-transfer>
  </div>
</template>

<script>
import ElTreeTransfer from '@/components/ElTreeTransfer'

export default {
  name: 'App',
  components: {
    ElTreeTransfer
  },
  data () {
    return {
      data: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 12,
              pid: 1,
              label: 'Level two 1-1',
              children: [
                {
                  id: 121,
                  pid: 12,
                  label: 'Level three 1-1-1'
                }
              ]
            }
          ]
        }, {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 21,
              pid: 2,
              label: 'Level two 2-1',
              children: [
                {
                  id: 212,
                  pid: 21,
                  label: 'Level three 2-1-1'
                }
              ]
            }, {
              id: 22,
              pid: 2,
              label: 'Level two 2-2',
              children: [
                {
                  id: 221,
                  pid: 22,
                  label: 'Level three 2-2-1'
                }
              ]
            }
          ]
        }, {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 31,
              pid: 3,
              label: 'Level two 3-1',
              children: [
                {
                  id: 311,
                  pid: 31,
                  label: 'Level three 3-1-1'
                }
              ]
            }, {
              id: 32,
              pid: 3,
              label: 'Level two 3-2',
              children: [
                {
                  id: 321,
                  pid: 32,
                  label: 'Level three 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      options: {
        nodeKey: 'id',
        nodePidKey: 'pid',
        leafOnly: false,
        leftTreeProps: {
          defaultCheckedKeys: [221, 321]
        },
        rightTreeProps: {

        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
