/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/riskassessment/api/finance/route";
exports.ids = ["app/riskassessment/api/finance/route"];
exports.modules = {

/***/ "(rsc)/./app/riskassessment/api/finance/route.ts":
/*!*************************************************!*\
  !*** ./app/riskassessment/api/finance/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function POST(request) {\n    try {\n        const data = await request.json();\n        const { userId, ...assessmentData } = data;\n        // Validate required fields\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: 'User ID is required'\n            }, {\n                status: 400\n            });\n        }\n        // Save to database\n        const financeAssessment = await prisma.financeAssessment.create({\n            data: {\n                userId: userId,\n                age: assessmentData.Age,\n                gender: assessmentData.Gender,\n                educationLevel: assessmentData.Education_Level,\n                maritalStatus: assessmentData.Marital_Status,\n                income: assessmentData.Income,\n                creditScore: assessmentData.Credit_Score,\n                loanAmount: assessmentData.Loan_Amount,\n                loanPurpose: assessmentData.Loan_Purpose,\n                employmentStatus: assessmentData.Employment_Status,\n                yearsAtCurrentJob: assessmentData.Years_at_Current_Job,\n                paymentHistory: assessmentData.Payment_History,\n                debtToIncomeRatio: assessmentData.Debt_to_Income_Ratio,\n                assetsValue: assessmentData.Assets_Value,\n                numberOfDependents: assessmentData.Number_of_Dependents,\n                previousDefaults: assessmentData.Previous_Defaults,\n                maritalStatusChange: assessmentData.Marital_Status_Change,\n                riskRating: assessmentData.riskRating || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            assessmentId: financeAssessment.id,\n            message: 'Finance assessment saved successfully'\n        });\n    } catch (error) {\n        console.error('Error saving finance assessment:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to save finance assessment',\n            details: error.message\n        }, {\n            status: 500\n        });\n    } finally{\n        await prisma.$disconnect();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvcmlza2Fzc2Vzc21lbnQvYXBpL2ZpbmFuY2Uvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUE2QztBQUNVO0FBRXZELE1BQU1FLFNBQVMsSUFBSUYsd0RBQVlBO0FBRXhCLGVBQWVHLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELFFBQVFFLElBQUk7UUFDL0IsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR0MsZ0JBQWdCLEdBQUdIO1FBRXRDLDJCQUEyQjtRQUMzQixJQUFJLENBQUNFLFFBQVE7WUFDWCxPQUFPTixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFBRUcsT0FBTztZQUFzQixHQUMvQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsbUJBQW1CO1FBQ25CLE1BQU1DLG9CQUFvQixNQUFNVCxPQUFPUyxpQkFBaUIsQ0FBQ0MsTUFBTSxDQUFDO1lBQzlEUCxNQUFNO2dCQUNKRSxRQUFRQTtnQkFDUk0sS0FBS0wsZUFBZU0sR0FBRztnQkFDdkJDLFFBQVFQLGVBQWVRLE1BQU07Z0JBQzdCQyxnQkFBZ0JULGVBQWVVLGVBQWU7Z0JBQzlDQyxlQUFlWCxlQUFlWSxjQUFjO2dCQUM1Q0MsUUFBUWIsZUFBZWMsTUFBTTtnQkFDN0JDLGFBQWFmLGVBQWVnQixZQUFZO2dCQUN4Q0MsWUFBWWpCLGVBQWVrQixXQUFXO2dCQUN0Q0MsYUFBYW5CLGVBQWVvQixZQUFZO2dCQUN4Q0Msa0JBQWtCckIsZUFBZXNCLGlCQUFpQjtnQkFDbERDLG1CQUFtQnZCLGVBQWV3QixvQkFBb0I7Z0JBQ3REQyxnQkFBZ0J6QixlQUFlMEIsZUFBZTtnQkFDOUNDLG1CQUFtQjNCLGVBQWU0QixvQkFBb0I7Z0JBQ3REQyxhQUFhN0IsZUFBZThCLFlBQVk7Z0JBQ3hDQyxvQkFBb0IvQixlQUFlZ0Msb0JBQW9CO2dCQUN2REMsa0JBQWtCakMsZUFBZWtDLGlCQUFpQjtnQkFDbERDLHFCQUFxQm5DLGVBQWVvQyxxQkFBcUI7Z0JBQ3pEQyxZQUFZckMsZUFBZXFDLFVBQVUsSUFBSTtZQUMzQztRQUNGO1FBRUEsT0FBTzVDLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFDdkJ3QyxTQUFTO1lBQ1RDLGNBQWNwQyxrQkFBa0JxQyxFQUFFO1lBQ2xDQyxTQUFTO1FBQ1g7SUFFRixFQUFFLE9BQU94QyxPQUFZO1FBQ25CeUMsUUFBUXpDLEtBQUssQ0FBQyxvQ0FBb0NBO1FBQ2xELE9BQU9SLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQUVHLE9BQU87WUFBcUMwQyxTQUFTMUMsTUFBTXdDLE9BQU87UUFBQyxHQUNyRTtZQUFFdkMsUUFBUTtRQUFJO0lBRWxCLFNBQVU7UUFDUixNQUFNUixPQUFPa0QsV0FBVztJQUMxQjtBQUNGIiwic291cmNlcyI6WyJTOlxcTVVGR1xcbXVmZ19tYWluXFxSaXNrLUxlbnNcXGFwcFxccmlza2Fzc2Vzc21lbnRcXGFwaVxcZmluYW5jZVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5pbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5cbmNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIGNvbnN0IHsgdXNlcklkLCAuLi5hc3Nlc3NtZW50RGF0YSB9ID0gZGF0YVxuXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogJ1VzZXIgSUQgaXMgcmVxdWlyZWQnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFNhdmUgdG8gZGF0YWJhc2VcbiAgICBjb25zdCBmaW5hbmNlQXNzZXNzbWVudCA9IGF3YWl0IHByaXNtYS5maW5hbmNlQXNzZXNzbWVudC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgYWdlOiBhc3Nlc3NtZW50RGF0YS5BZ2UsXG4gICAgICAgIGdlbmRlcjogYXNzZXNzbWVudERhdGEuR2VuZGVyLFxuICAgICAgICBlZHVjYXRpb25MZXZlbDogYXNzZXNzbWVudERhdGEuRWR1Y2F0aW9uX0xldmVsLFxuICAgICAgICBtYXJpdGFsU3RhdHVzOiBhc3Nlc3NtZW50RGF0YS5NYXJpdGFsX1N0YXR1cyxcbiAgICAgICAgaW5jb21lOiBhc3Nlc3NtZW50RGF0YS5JbmNvbWUsXG4gICAgICAgIGNyZWRpdFNjb3JlOiBhc3Nlc3NtZW50RGF0YS5DcmVkaXRfU2NvcmUsXG4gICAgICAgIGxvYW5BbW91bnQ6IGFzc2Vzc21lbnREYXRhLkxvYW5fQW1vdW50LFxuICAgICAgICBsb2FuUHVycG9zZTogYXNzZXNzbWVudERhdGEuTG9hbl9QdXJwb3NlLFxuICAgICAgICBlbXBsb3ltZW50U3RhdHVzOiBhc3Nlc3NtZW50RGF0YS5FbXBsb3ltZW50X1N0YXR1cyxcbiAgICAgICAgeWVhcnNBdEN1cnJlbnRKb2I6IGFzc2Vzc21lbnREYXRhLlllYXJzX2F0X0N1cnJlbnRfSm9iLFxuICAgICAgICBwYXltZW50SGlzdG9yeTogYXNzZXNzbWVudERhdGEuUGF5bWVudF9IaXN0b3J5LFxuICAgICAgICBkZWJ0VG9JbmNvbWVSYXRpbzogYXNzZXNzbWVudERhdGEuRGVidF90b19JbmNvbWVfUmF0aW8sXG4gICAgICAgIGFzc2V0c1ZhbHVlOiBhc3Nlc3NtZW50RGF0YS5Bc3NldHNfVmFsdWUsXG4gICAgICAgIG51bWJlck9mRGVwZW5kZW50czogYXNzZXNzbWVudERhdGEuTnVtYmVyX29mX0RlcGVuZGVudHMsXG4gICAgICAgIHByZXZpb3VzRGVmYXVsdHM6IGFzc2Vzc21lbnREYXRhLlByZXZpb3VzX0RlZmF1bHRzLFxuICAgICAgICBtYXJpdGFsU3RhdHVzQ2hhbmdlOiBhc3Nlc3NtZW50RGF0YS5NYXJpdGFsX1N0YXR1c19DaGFuZ2UsXG4gICAgICAgIHJpc2tSYXRpbmc6IGFzc2Vzc21lbnREYXRhLnJpc2tSYXRpbmcgfHwgbnVsbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGFzc2Vzc21lbnRJZDogZmluYW5jZUFzc2Vzc21lbnQuaWQsXG4gICAgICBtZXNzYWdlOiAnRmluYW5jZSBhc3Nlc3NtZW50IHNhdmVkIHN1Y2Nlc3NmdWxseSdcbiAgICB9KVxuXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgZmluYW5jZSBhc3Nlc3NtZW50OicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gc2F2ZSBmaW5hbmNlIGFzc2Vzc21lbnQnLCBkZXRhaWxzOiBlcnJvci5tZXNzYWdlIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgcHJpc21hLiRkaXNjb25uZWN0KClcbiAgfVxufSJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJQT1NUIiwicmVxdWVzdCIsImRhdGEiLCJqc29uIiwidXNlcklkIiwiYXNzZXNzbWVudERhdGEiLCJlcnJvciIsInN0YXR1cyIsImZpbmFuY2VBc3Nlc3NtZW50IiwiY3JlYXRlIiwiYWdlIiwiQWdlIiwiZ2VuZGVyIiwiR2VuZGVyIiwiZWR1Y2F0aW9uTGV2ZWwiLCJFZHVjYXRpb25fTGV2ZWwiLCJtYXJpdGFsU3RhdHVzIiwiTWFyaXRhbF9TdGF0dXMiLCJpbmNvbWUiLCJJbmNvbWUiLCJjcmVkaXRTY29yZSIsIkNyZWRpdF9TY29yZSIsImxvYW5BbW91bnQiLCJMb2FuX0Ftb3VudCIsImxvYW5QdXJwb3NlIiwiTG9hbl9QdXJwb3NlIiwiZW1wbG95bWVudFN0YXR1cyIsIkVtcGxveW1lbnRfU3RhdHVzIiwieWVhcnNBdEN1cnJlbnRKb2IiLCJZZWFyc19hdF9DdXJyZW50X0pvYiIsInBheW1lbnRIaXN0b3J5IiwiUGF5bWVudF9IaXN0b3J5IiwiZGVidFRvSW5jb21lUmF0aW8iLCJEZWJ0X3RvX0luY29tZV9SYXRpbyIsImFzc2V0c1ZhbHVlIiwiQXNzZXRzX1ZhbHVlIiwibnVtYmVyT2ZEZXBlbmRlbnRzIiwiTnVtYmVyX29mX0RlcGVuZGVudHMiLCJwcmV2aW91c0RlZmF1bHRzIiwiUHJldmlvdXNfRGVmYXVsdHMiLCJtYXJpdGFsU3RhdHVzQ2hhbmdlIiwiTWFyaXRhbF9TdGF0dXNfQ2hhbmdlIiwicmlza1JhdGluZyIsInN1Y2Nlc3MiLCJhc3Nlc3NtZW50SWQiLCJpZCIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZGV0YWlscyIsIiRkaXNjb25uZWN0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/riskassessment/api/finance/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Ffinance%2Froute&page=%2Friskassessment%2Fapi%2Ffinance%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Ffinance%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Ffinance%2Froute&page=%2Friskassessment%2Fapi%2Ffinance%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Ffinance%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_finance_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/riskassessment/api/finance/route.ts */ \"(rsc)/./app/riskassessment/api/finance/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/riskassessment/api/finance/route\",\n        pathname: \"/riskassessment/api/finance\",\n        filename: \"route\",\n        bundlePath: \"app/riskassessment/api/finance/route\"\n    },\n    resolvedPagePath: \"S:\\\\MUFG\\\\mufg_main\\\\Risk-Lens\\\\app\\\\riskassessment\\\\api\\\\finance\\\\route.ts\",\n    nextConfigOutput,\n    userland: S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_finance_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZyaXNrYXNzZXNzbWVudCUyRmFwaSUyRmZpbmFuY2UlMkZyb3V0ZSZwYWdlPSUyRnJpc2thc3Nlc3NtZW50JTJGYXBpJTJGZmluYW5jZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRnJpc2thc3Nlc3NtZW50JTJGYXBpJTJGZmluYW5jZSUyRnJvdXRlLnRzJmFwcERpcj1TJTNBJTVDTVVGRyU1Q211ZmdfbWFpbiU1Q1Jpc2stTGVucyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9UyUzQSU1Q01VRkclNUNtdWZnX21haW4lNUNSaXNrLUxlbnMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJCO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJTOlxcXFxNVUZHXFxcXG11ZmdfbWFpblxcXFxSaXNrLUxlbnNcXFxcYXBwXFxcXHJpc2thc3Nlc3NtZW50XFxcXGFwaVxcXFxmaW5hbmNlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL3Jpc2thc3Nlc3NtZW50L2FwaS9maW5hbmNlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9yaXNrYXNzZXNzbWVudC9hcGkvZmluYW5jZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9yaXNrYXNzZXNzbWVudC9hcGkvZmluYW5jZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIlM6XFxcXE1VRkdcXFxcbXVmZ19tYWluXFxcXFJpc2stTGVuc1xcXFxhcHBcXFxccmlza2Fzc2Vzc21lbnRcXFxcYXBpXFxcXGZpbmFuY2VcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Ffinance%2Froute&page=%2Friskassessment%2Fapi%2Ffinance%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Ffinance%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Ffinance%2Froute&page=%2Friskassessment%2Fapi%2Ffinance%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Ffinance%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();