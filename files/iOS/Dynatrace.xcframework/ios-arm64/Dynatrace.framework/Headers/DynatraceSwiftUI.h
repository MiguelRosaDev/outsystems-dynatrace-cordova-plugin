// DynatraceSwiftUI.h
// Version: ${version}
//
// These materials contain confidential information and
// trade secrets of Dynatrace Corporation. You shall
// maintain the materials as confidential and shall not
// disclose its contents to any third party except as may
// be required by law or regulation. Use, disclosure,
// or reproduction is prohibited without the prior express
// written permission of Dynatrace LLC.
//
// All Dynatrace products listed within the materials are
// trademarks of Dynatrace Corporation. All other company
// or product names are trademarks of their respective owners.
//
// Copyright 2011-2023 Dynatrace LLC

#import <Foundation/Foundation.h>
#import "Dynatrace.h"

@interface DynatraceSwiftUI: NSObject
/*!
 @brief Gets invoked automatically by the SwiftUI instrumentor before a SwiftUI view has appeared.
 */
+ (void)swiftUIViewWillAppear:(NSDictionary* _Nonnull)reportValues viewName:(NSString* _Nonnull)viewName view:(id _Nonnull)view with:(id _Nonnull)lifecycleHolder createAction:(BOOL)createAction;

/*!
 @brief Gets invoked automatically by the SwiftUI instrumentor when a SwiftUI view has disappeared.
 */
+ (void)swiftUIViewDidDisappear:(id _Nonnull)view with:(id _Nonnull)lifecycleHolder;

/*!
 @brief Gets invoked automatically by the SwiftUI instrumentor when a touch action must be reported.
 */
+ (DTXAction* _Nonnull)touchActionWith:(NSDictionary* _Nonnull)reportValues;

/*!
 @brief Gets invoked automatically by the SwiftUI instrumentor when a touch action must be reported.
 */
+ (DTXAction* _Nonnull)touchActionWith:(NSDictionary * _Nonnull)reportValues delayTimeout:(bool)delayTimout;

/*!
 @brief Gets invoked automatically by the SwiftUI instrumentor when an action is left.
 */
+ (DTX_StatusCode)leaveActionIncludingAutoUserActionsWith:(DTXAction* _Nonnull)action;

@end
