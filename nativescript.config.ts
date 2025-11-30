import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.courseredux.app',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
