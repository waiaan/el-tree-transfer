# el-tree-transfer

### A tree-transfer based on element-ui、tailwind css.


![](https://raw.githubusercontent.com/waiaan/ElTreeTransfer/master/screenshot.png)


## usage

### make sure element-ui has been installed, see https://element.eleme.cn/#/en-US/component/installation

### html
```html
<template>
  <div id="app">
    <el-tree-transfer :data="data" :options="options"></el-tree-transfer>
  </div>
</template>
```

### js
```js
import ElTreeTransfer from 'ElTreeTransfer'

export default {
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
        // required and unique, tree node id.
        nodeKey: 'id',
        // required, tree node's parent node id.
        nodePidKey: 'pid',
        // could only leaf node be transfered
        leafOnly: true,
        buttons: {
         // show tranfser buttons,set to [] will transfer on tree node checked.
          funcs: ['allRight', 'right', 'left', 'allLeft'],
          config: {
            // each button's config, same as element-ui button attributes, see https://element.eleme.cn/#/en-US/component/button
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
        // tree's props, same as element-ui tree attributes, see https://element.eleme.cn/#/en-US/component/tree
        leftTreeProps: {

        },
        rightTreeProps: {

        }
      }
    }
  }
}
```

### method

|name|arguments|return|
| ------ | ------ | ------ |
|getSelectedData|-|(Array)selected data|