module.exports = {
    cordova: {
        debug: false
    },

    js: {
        url: "",
        mode: 4
    },

    android: {
        // Those configs are copied 1:1
        config: `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId 'Insert your ApplicationID from Config'
                        beaconUrl 'Insert your BeaconURL from Config'
                    }
                }
            }
        }
        `
    },

    ios: {
        // Those configs are copied 1:1
        config: `
        <key>DTXApplicationID</key>
        <string>Insert your ApplicationID from Config</string>
        <key>DTXBeaconURL</key>
        <string>Insert your ClusterURL from Config</string>
        `
    }
}