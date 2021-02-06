const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    withCss,
    withLess({
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: {
                "@primary-color": "#08729E",
                "@secondary-color": "#00a4a5",
                "@link-color": "#1890ff",
                "@success-color": "#52c41a",
                "@warning-color": "#faad14",
                "@error-color": "#f5222d",
                "@font-size-bas": "14px",
                "@heading-color": "rgba(0, 0, 0, 0.85)",
                "@text-color": "rgba(0, 0, 0, 0.65)",
                "@text-color-secondary": "rgba(0, 0, 0, 0.45)",
                "@disabled-color": "rgba(0, 0, 0, 0.25)",
                "@border-radius-base": "4px",
                "@border-color-base": "#d9d9d9",
                "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)"
            }
        },
        webpack: (config, { isServer }) => {
            config.node = {
                fs: 'empty'
            }
            if (isServer) {
                const antStyles = /antd\/.*?\/style.*?/;
                const origExternals = [...config.externals];
                config.externals = [
                    (context, request, callback) => {
                        if (request.match(antStyles)) return callback();
                        if (typeof origExternals[0] === "function") {
                            origExternals[0](context, request, callback);
                        } else {
                            callback();
                        }
                    },
                    ...(typeof origExternals[0] === "function" ? [] : origExternals)
                ];
            }
            return config;
        }
    })
]);