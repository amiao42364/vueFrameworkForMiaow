<template>
    <div class="app-container home">
        <el-row :gutter="20">
            <el-col :lg="12" :sm="24" style="padding-left: 20px">
                <h2>后台管理框架</h2>
                <p>copy了若依管理框架</p>
                <p>
                    <b>当前版本:</b> <span>v{{ version }}</span>
                </p>
            </el-col>

            <el-col :lg="12" :sm="24" style="padding-left: 50px">
                <el-row>
                    <el-col :span="12">
                        <h2>技术选型</h2>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <h4>后端技术</h4>
                        <ul>
                            <li>SpringBoot</li>
                            <li>Spring Security</li>
                            <li>JWT</li>
                            <li>MyBatis</li>
                            <li>Druid</li>
                            <li>Fastjson</li>
                            <li>...</li>
                        </ul>
                    </el-col>
                    <el-col :span="6">
                        <h4>前端技术</h4>
                        <ul>
                            <li>Vue</li>
                            <li>Vuex</li>
                            <li>Element-ui</li>
                            <li>Axios</li>
                            <li>Sass</li>
                            <li>Quill</li>
                            <li>...</li>
                        </ul>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-divider />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const version = ref('3.8.6')
</script>

<style scoped lang="scss">
.home {
    ul {
        padding: 0;
        margin: 0;
    }

    font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #676a6c;
    overflow-x: hidden;

    ul {
        list-style-type: none;
    }

    h4 {
        margin-top: 0;
    }

    h2 {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 100;
    }

    p {
        margin-top: 10px;

        b {
            font-weight: 700;
        }
    }
}
</style>
