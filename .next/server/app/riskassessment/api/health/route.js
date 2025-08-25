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
exports.id = "app/riskassessment/api/health/route";
exports.ids = ["app/riskassessment/api/health/route"];
exports.modules = {

/***/ "(rsc)/./app/riskassessment/api/health/route.ts":
/*!************************************************!*\
  !*** ./app/riskassessment/api/health/route.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nasync function POST(request) {\n    try {\n        const data = await request.json();\n        const { userId, ...assessmentData } = data;\n        // Validate required fields\n        if (!userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: 'User ID is required'\n            }, {\n                status: 400\n            });\n        }\n        // Save to database\n        const healthAssessment = await prisma.healthAssessment.create({\n            data: {\n                userId: userId,\n                male: assessmentData.male,\n                age: assessmentData.age,\n                education: assessmentData.education,\n                currentSmoker: assessmentData.currentSmoker,\n                cigsPerDay: assessmentData.cigsPerDay,\n                bpMeds: assessmentData.BPMeds,\n                prevalentStroke: assessmentData.prevalentStroke,\n                prevalentHyp: assessmentData.prevalentHyp,\n                diabetes: assessmentData.diabetes,\n                totChol: assessmentData.totChol,\n                sysBP: assessmentData.sysBP,\n                diaBP: assessmentData.diaBP,\n                bmi: assessmentData.BMI,\n                heartRate: assessmentData.heartRate,\n                glucose: assessmentData.glucose,\n                tenYearCHD: assessmentData.TenYearCHD,\n                probability: assessmentData.probability || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            success: true,\n            assessmentId: healthAssessment.id,\n            message: 'Health assessment saved successfully'\n        });\n    } catch (error) {\n        console.error('Error saving health assessment:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Failed to save health assessment',\n            details: error.message\n        }, {\n            status: 500\n        });\n    } finally{\n        await prisma.$disconnect();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvcmlza2Fzc2Vzc21lbnQvYXBpL2hlYWx0aC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTZDO0FBQ1U7QUFFdkQsTUFBTUUsU0FBUyxJQUFJRix3REFBWUE7QUFFeEIsZUFBZUcsS0FBS0MsT0FBb0I7SUFDN0MsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsUUFBUUUsSUFBSTtRQUMvQixNQUFNLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyxnQkFBZ0IsR0FBR0g7UUFFdEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQ0UsUUFBUTtZQUNYLE9BQU9OLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO2dCQUFFRyxPQUFPO1lBQXNCLEdBQy9CO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSxtQkFBbUI7UUFDbkIsTUFBTUMsbUJBQW1CLE1BQU1ULE9BQU9TLGdCQUFnQixDQUFDQyxNQUFNLENBQUM7WUFDNURQLE1BQU07Z0JBQ0pFLFFBQVFBO2dCQUNSTSxNQUFNTCxlQUFlSyxJQUFJO2dCQUN6QkMsS0FBS04sZUFBZU0sR0FBRztnQkFDdkJDLFdBQVdQLGVBQWVPLFNBQVM7Z0JBQ25DQyxlQUFlUixlQUFlUSxhQUFhO2dCQUMzQ0MsWUFBWVQsZUFBZVMsVUFBVTtnQkFDckNDLFFBQVFWLGVBQWVXLE1BQU07Z0JBQzdCQyxpQkFBaUJaLGVBQWVZLGVBQWU7Z0JBQy9DQyxjQUFjYixlQUFlYSxZQUFZO2dCQUN6Q0MsVUFBVWQsZUFBZWMsUUFBUTtnQkFDakNDLFNBQVNmLGVBQWVlLE9BQU87Z0JBQy9CQyxPQUFPaEIsZUFBZWdCLEtBQUs7Z0JBQzNCQyxPQUFPakIsZUFBZWlCLEtBQUs7Z0JBQzNCQyxLQUFLbEIsZUFBZW1CLEdBQUc7Z0JBQ3ZCQyxXQUFXcEIsZUFBZW9CLFNBQVM7Z0JBQ25DQyxTQUFTckIsZUFBZXFCLE9BQU87Z0JBQy9CQyxZQUFZdEIsZUFBZXVCLFVBQVU7Z0JBQ3JDQyxhQUFheEIsZUFBZXdCLFdBQVcsSUFBSTtZQUM3QztRQUNGO1FBRUEsT0FBTy9CLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFDdkIyQixTQUFTO1lBQ1RDLGNBQWN2QixpQkFBaUJ3QixFQUFFO1lBQ2pDQyxTQUFTO1FBQ1g7SUFFRixFQUFFLE9BQU8zQixPQUFZO1FBQ25CNEIsUUFBUTVCLEtBQUssQ0FBQyxtQ0FBbUNBO1FBQ2pELE9BQU9SLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQUVHLE9BQU87WUFBb0M2QixTQUFTN0IsTUFBTTJCLE9BQU87UUFBQyxHQUNwRTtZQUFFMUIsUUFBUTtRQUFJO0lBRWxCLFNBQVU7UUFDUixNQUFNUixPQUFPcUMsV0FBVztJQUMxQjtBQUNGIiwic291cmNlcyI6WyJTOlxcTVVGR1xcbXVmZ19tYWluXFxSaXNrLUxlbnNcXGFwcFxccmlza2Fzc2Vzc21lbnRcXGFwaVxcaGVhbHRoXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCdcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcblxuY29uc3QgcHJpc21hID0gbmV3IFByaXNtYUNsaWVudCgpXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgY29uc3QgeyB1c2VySWQsIC4uLmFzc2Vzc21lbnREYXRhIH0gPSBkYXRhXG5cbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVXNlciBJRCBpcyByZXF1aXJlZCcgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gU2F2ZSB0byBkYXRhYmFzZVxuICAgIGNvbnN0IGhlYWx0aEFzc2Vzc21lbnQgPSBhd2FpdCBwcmlzbWEuaGVhbHRoQXNzZXNzbWVudC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICB1c2VySWQ6IHVzZXJJZCxcbiAgICAgICAgbWFsZTogYXNzZXNzbWVudERhdGEubWFsZSxcbiAgICAgICAgYWdlOiBhc3Nlc3NtZW50RGF0YS5hZ2UsXG4gICAgICAgIGVkdWNhdGlvbjogYXNzZXNzbWVudERhdGEuZWR1Y2F0aW9uLFxuICAgICAgICBjdXJyZW50U21va2VyOiBhc3Nlc3NtZW50RGF0YS5jdXJyZW50U21va2VyLFxuICAgICAgICBjaWdzUGVyRGF5OiBhc3Nlc3NtZW50RGF0YS5jaWdzUGVyRGF5LFxuICAgICAgICBicE1lZHM6IGFzc2Vzc21lbnREYXRhLkJQTWVkcyxcbiAgICAgICAgcHJldmFsZW50U3Ryb2tlOiBhc3Nlc3NtZW50RGF0YS5wcmV2YWxlbnRTdHJva2UsXG4gICAgICAgIHByZXZhbGVudEh5cDogYXNzZXNzbWVudERhdGEucHJldmFsZW50SHlwLFxuICAgICAgICBkaWFiZXRlczogYXNzZXNzbWVudERhdGEuZGlhYmV0ZXMsXG4gICAgICAgIHRvdENob2w6IGFzc2Vzc21lbnREYXRhLnRvdENob2wsXG4gICAgICAgIHN5c0JQOiBhc3Nlc3NtZW50RGF0YS5zeXNCUCxcbiAgICAgICAgZGlhQlA6IGFzc2Vzc21lbnREYXRhLmRpYUJQLFxuICAgICAgICBibWk6IGFzc2Vzc21lbnREYXRhLkJNSSxcbiAgICAgICAgaGVhcnRSYXRlOiBhc3Nlc3NtZW50RGF0YS5oZWFydFJhdGUsXG4gICAgICAgIGdsdWNvc2U6IGFzc2Vzc21lbnREYXRhLmdsdWNvc2UsXG4gICAgICAgIHRlblllYXJDSEQ6IGFzc2Vzc21lbnREYXRhLlRlblllYXJDSEQgLFxuICAgICAgICBwcm9iYWJpbGl0eTogYXNzZXNzbWVudERhdGEucHJvYmFiaWxpdHkgfHwgbnVsbFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIGFzc2Vzc21lbnRJZDogaGVhbHRoQXNzZXNzbWVudC5pZCxcbiAgICAgIG1lc3NhZ2U6ICdIZWFsdGggYXNzZXNzbWVudCBzYXZlZCBzdWNjZXNzZnVsbHknXG4gICAgfSlcblxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIGhlYWx0aCBhc3Nlc3NtZW50OicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdGYWlsZWQgdG8gc2F2ZSBoZWFsdGggYXNzZXNzbWVudCcsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBwcmlzbWEuJGRpc2Nvbm5lY3QoKVxuICB9XG59Il0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsIk5leHRSZXNwb25zZSIsInByaXNtYSIsIlBPU1QiLCJyZXF1ZXN0IiwiZGF0YSIsImpzb24iLCJ1c2VySWQiLCJhc3Nlc3NtZW50RGF0YSIsImVycm9yIiwic3RhdHVzIiwiaGVhbHRoQXNzZXNzbWVudCIsImNyZWF0ZSIsIm1hbGUiLCJhZ2UiLCJlZHVjYXRpb24iLCJjdXJyZW50U21va2VyIiwiY2lnc1BlckRheSIsImJwTWVkcyIsIkJQTWVkcyIsInByZXZhbGVudFN0cm9rZSIsInByZXZhbGVudEh5cCIsImRpYWJldGVzIiwidG90Q2hvbCIsInN5c0JQIiwiZGlhQlAiLCJibWkiLCJCTUkiLCJoZWFydFJhdGUiLCJnbHVjb3NlIiwidGVuWWVhckNIRCIsIlRlblllYXJDSEQiLCJwcm9iYWJpbGl0eSIsInN1Y2Nlc3MiLCJhc3Nlc3NtZW50SWQiLCJpZCIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZGV0YWlscyIsIiRkaXNjb25uZWN0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/riskassessment/api/health/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fhealth%2Froute&page=%2Friskassessment%2Fapi%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fhealth%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fhealth%2Froute&page=%2Friskassessment%2Fapi%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fhealth%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_health_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/riskassessment/api/health/route.ts */ \"(rsc)/./app/riskassessment/api/health/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/riskassessment/api/health/route\",\n        pathname: \"/riskassessment/api/health\",\n        filename: \"route\",\n        bundlePath: \"app/riskassessment/api/health/route\"\n    },\n    resolvedPagePath: \"S:\\\\MUFG\\\\mufg_main\\\\Risk-Lens\\\\app\\\\riskassessment\\\\api\\\\health\\\\route.ts\",\n    nextConfigOutput,\n    userland: S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_health_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZyaXNrYXNzZXNzbWVudCUyRmFwaSUyRmhlYWx0aCUyRnJvdXRlJnBhZ2U9JTJGcmlza2Fzc2Vzc21lbnQlMkZhcGklMkZoZWFsdGglMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZyaXNrYXNzZXNzbWVudCUyRmFwaSUyRmhlYWx0aCUyRnJvdXRlLnRzJmFwcERpcj1TJTNBJTVDTVVGRyU1Q211ZmdfbWFpbiU1Q1Jpc2stTGVucyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9UyUzQSU1Q01VRkclNUNtdWZnX21haW4lNUNSaXNrLUxlbnMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzBCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJTOlxcXFxNVUZHXFxcXG11ZmdfbWFpblxcXFxSaXNrLUxlbnNcXFxcYXBwXFxcXHJpc2thc3Nlc3NtZW50XFxcXGFwaVxcXFxoZWFsdGhcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvcmlza2Fzc2Vzc21lbnQvYXBpL2hlYWx0aC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvcmlza2Fzc2Vzc21lbnQvYXBpL2hlYWx0aFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9yaXNrYXNzZXNzbWVudC9hcGkvaGVhbHRoL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiUzpcXFxcTVVGR1xcXFxtdWZnX21haW5cXFxcUmlzay1MZW5zXFxcXGFwcFxcXFxyaXNrYXNzZXNzbWVudFxcXFxhcGlcXFxcaGVhbHRoXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fhealth%2Froute&page=%2Friskassessment%2Fapi%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fhealth%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fhealth%2Froute&page=%2Friskassessment%2Fapi%2Fhealth%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fhealth%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();