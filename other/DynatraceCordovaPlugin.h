#import <Cordova/CDVPlugin.h>

@interface DynatraceCordovaPlugin : CDVPlugin

- (void)endVisit:(CDVInvokedUrlCommand*)command;

- (void) getUserPrivacyOptions:(CDVInvokedUrlCommand*)command;

- (void) applyUserPrivacyOptions:(CDVInvokedUrlCommand*)command;

@end