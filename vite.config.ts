import {defineConfig, loadEnv} from 'vite';
import autoImport from 'unplugin-auto-import/vite';
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import setupExtend from 'vite-plugin-vue-setup-extend';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import windiCSS from 'vite-plugin-windicss';
import legacy from '@vitejs/plugin-legacy';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd());
    const { VITE_APP_ENV } = env;
    return {
        // 设置打包路径
        base: VITE_APP_ENV === 'production' ? '/' : '/',
        // vite 相关配置
        server: {
            port: 8766,
            host: true,
            open: false,
            proxy: {
                // https://cn.vitejs.dev/config/#server-proxy
                '/dev-api': {
                    target: 'http://localhost:8765',
                    changeOrigin: true,
                    rewrite: p => p.replace(/^\/dev-api/, '')
                }
            }
        },
        css: {
            modules: {
                localsConvention: 'camelCase' // 默认只支持驼峰，修改为同时支持横线和驼峰
            },
            preprocessorOptions: {
                scss: {
                    charset: false
                },
                less: {
                    charset: false
                }
            },
            // charset: false,
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: atRule => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ]
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            windiCSS(),
            legacy({
                targets: ['defaults', 'not IE 11']
            }),
            // https://github.com/fi3ework/vite-plugin-checker
            checker({
                typescript: true,
                // vueTsc: true,
                eslint: {
                    lintCommand: 'eslint "./src/**/*.{.vue,ts,tsx}"' // for example, lint .ts & .tsx
                }
            }),
            autoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                dts: true,
                imports: ['vue', 'vue-router']
            }),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
                symbolId: 'icon-[dir]-[name]',
                svgoOptions: command === 'build'
            }),
            setupExtend()
        ],
        resolve: {
            alias: {
                // 设置别名
                "@": path.join(__dirname, "./src")
            }
        },
        build: {
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
            target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
            chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
            assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
            minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
            terserOptions: {
                compress: {
                    drop_console: true, // 生产环境去除console
                    drop_debugger: true // 生产环境去除debugger
                }
            }
        }
    };
});
