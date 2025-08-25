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
exports.id = "app/riskassessment/api/gemini-analysis/route";
exports.ids = ["app/riskassessment/api/gemini-analysis/route"];
exports.modules = {

/***/ "(rsc)/./app/riskassessment/api/gemini-analysis/route.ts":
/*!*********************************************************!*\
  !*** ./app/riskassessment/api/gemini-analysis/route.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nasync function POST(request) {\n    try {\n        const { prompt } = await request.json();\n        const apiKey = process.env.GOOGLE_GEMINI_API;\n        if (!apiKey) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Gemini API key not configured\"\n            }, {\n                status: 500\n            });\n        }\n        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                \"Accept\": \"application/json\"\n            },\n            body: JSON.stringify({\n                contents: [\n                    {\n                        parts: [\n                            {\n                                text: prompt\n                            }\n                        ]\n                    }\n                ],\n                generationConfig: {\n                    temperature: 0.7,\n                    topK: 40,\n                    topP: 0.95,\n                    maxOutputTokens: 150\n                }\n            })\n        });\n        if (!response.ok) {\n            throw new Error(`Gemini API error: ${response.status}`);\n        }\n        const data = await response.json();\n        const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || \"Analysis unavailable\";\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            analysis\n        });\n    } catch (error) {\n        console.error(\"Error calling Gemini API:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to generate analysis\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvcmlza2Fzc2Vzc21lbnQvYXBpL2dlbWluaS1hbmFseXNpcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUE0RDtBQUVyRCxlQUFlQyxLQUFLQyxPQUFvQjtJQUM3QyxJQUFJO1FBQ0YsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBRyxNQUFNRCxRQUFRRSxJQUFJO1FBRXJDLE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO1FBQzVDLElBQUksQ0FBQ0gsUUFBUTtZQUNYLE9BQU9MLHFEQUFZQSxDQUFDSSxJQUFJLENBQUM7Z0JBQUVLLE9BQU87WUFBZ0MsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3JGO1FBRUEsTUFBTUMsV0FBVyxNQUFNQyxNQUNyQixDQUFDLGlHQUFpRyxFQUFFUCxRQUFRLEVBQzVHO1lBQ0VRLFFBQVE7WUFDUkMsU0FBUztnQkFDUCxnQkFBZ0I7Z0JBQ2hCLFVBQVU7WUFDWjtZQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7Z0JBQ25CQyxVQUFVO29CQUNSO3dCQUNFQyxPQUFPOzRCQUNMO2dDQUNFQyxNQUFNakI7NEJBQ1I7eUJBQ0Q7b0JBQ0g7aUJBQ0Q7Z0JBQ0RrQixrQkFBa0I7b0JBQ2hCQyxhQUFhO29CQUNiQyxNQUFNO29CQUNOQyxNQUFNO29CQUNOQyxpQkFBaUI7Z0JBQ25CO1lBQ0Y7UUFDRjtRQUdGLElBQUksQ0FBQ2QsU0FBU2UsRUFBRSxFQUFFO1lBQ2hCLE1BQU0sSUFBSUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFaEIsU0FBU0QsTUFBTSxFQUFFO1FBQ3hEO1FBRUEsTUFBTWtCLE9BQU8sTUFBTWpCLFNBQVNQLElBQUk7UUFDaEMsTUFBTXlCLFdBQVdELEtBQUtFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRUMsU0FBU1osT0FBTyxDQUFDLEVBQUUsRUFBRUMsUUFBUTtRQUVwRSxPQUFPcEIscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFeUI7UUFBUztJQUN0QyxFQUFFLE9BQU9wQixPQUFPO1FBQ2R1QixRQUFRdkIsS0FBSyxDQUFDLDZCQUE2QkE7UUFDM0MsT0FBT1QscURBQVlBLENBQUNJLElBQUksQ0FBQztZQUFFSyxPQUFPO1FBQThCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25GO0FBQ0YiLCJzb3VyY2VzIjpbIlM6XFxNVUZHXFxtdWZnX21haW5cXFJpc2stTGVuc1xcYXBwXFxyaXNrYXNzZXNzbWVudFxcYXBpXFxnZW1pbmktYW5hbHlzaXNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHR5cGUgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHByb21wdCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICBjb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5HT09HTEVfR0VNSU5JX0FQSVxyXG4gICAgaWYgKCFhcGlLZXkpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiR2VtaW5pIEFQSSBrZXkgbm90IGNvbmZpZ3VyZWRcIiB9LCB7IHN0YXR1czogNTAwIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vZ2VuZXJhdGl2ZWxhbmd1YWdlLmdvb2dsZWFwaXMuY29tL3YxYmV0YS9tb2RlbHMvZ2VtaW5pLTIuMC1mbGFzaC1leHA6Z2VuZXJhdGVDb250ZW50P2tleT0ke2FwaUtleX1gLFxyXG4gICAgICB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgY29udGVudHM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHBhcnRzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQ6IHByb21wdCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICBnZW5lcmF0aW9uQ29uZmlnOiB7XHJcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlOiAwLjcsXHJcbiAgICAgICAgICAgIHRvcEs6IDQwLFxyXG4gICAgICAgICAgICB0b3BQOiAwLjk1LFxyXG4gICAgICAgICAgICBtYXhPdXRwdXRUb2tlbnM6IDE1MCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0sXHJcbiAgICApXHJcblxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEdlbWluaSBBUEkgZXJyb3I6ICR7cmVzcG9uc2Uuc3RhdHVzfWApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxyXG4gICAgY29uc3QgYW5hbHlzaXMgPSBkYXRhLmNhbmRpZGF0ZXM/LlswXT8uY29udGVudD8ucGFydHM/LlswXT8udGV4dCB8fCBcIkFuYWx5c2lzIHVuYXZhaWxhYmxlXCJcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBhbmFseXNpcyB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY2FsbGluZyBHZW1pbmkgQVBJOlwiLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBnZW5lcmF0ZSBhbmFseXNpc1wiIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcXVlc3QiLCJwcm9tcHQiLCJqc29uIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9HRU1JTklfQVBJIiwiZXJyb3IiLCJzdGF0dXMiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY29udGVudHMiLCJwYXJ0cyIsInRleHQiLCJnZW5lcmF0aW9uQ29uZmlnIiwidGVtcGVyYXR1cmUiLCJ0b3BLIiwidG9wUCIsIm1heE91dHB1dFRva2VucyIsIm9rIiwiRXJyb3IiLCJkYXRhIiwiYW5hbHlzaXMiLCJjYW5kaWRhdGVzIiwiY29udGVudCIsImNvbnNvbGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/riskassessment/api/gemini-analysis/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&page=%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&page=%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_gemini_analysis_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/riskassessment/api/gemini-analysis/route.ts */ \"(rsc)/./app/riskassessment/api/gemini-analysis/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/riskassessment/api/gemini-analysis/route\",\n        pathname: \"/riskassessment/api/gemini-analysis\",\n        filename: \"route\",\n        bundlePath: \"app/riskassessment/api/gemini-analysis/route\"\n    },\n    resolvedPagePath: \"S:\\\\MUFG\\\\mufg_main\\\\Risk-Lens\\\\app\\\\riskassessment\\\\api\\\\gemini-analysis\\\\route.ts\",\n    nextConfigOutput,\n    userland: S_MUFG_mufg_main_Risk_Lens_app_riskassessment_api_gemini_analysis_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZyaXNrYXNzZXNzbWVudCUyRmFwaSUyRmdlbWluaS1hbmFseXNpcyUyRnJvdXRlJnBhZ2U9JTJGcmlza2Fzc2Vzc21lbnQlMkZhcGklMkZnZW1pbmktYW5hbHlzaXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZyaXNrYXNzZXNzbWVudCUyRmFwaSUyRmdlbWluaS1hbmFseXNpcyUyRnJvdXRlLnRzJmFwcERpcj1TJTNBJTVDTVVGRyU1Q211ZmdfbWFpbiU1Q1Jpc2stTGVucyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9UyUzQSU1Q01VRkclNUNtdWZnX21haW4lNUNSaXNrLUxlbnMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ21DO0FBQ2hIO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJTOlxcXFxNVUZHXFxcXG11ZmdfbWFpblxcXFxSaXNrLUxlbnNcXFxcYXBwXFxcXHJpc2thc3Nlc3NtZW50XFxcXGFwaVxcXFxnZW1pbmktYW5hbHlzaXNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvcmlza2Fzc2Vzc21lbnQvYXBpL2dlbWluaS1hbmFseXNpcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvcmlza2Fzc2Vzc21lbnQvYXBpL2dlbWluaS1hbmFseXNpc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9yaXNrYXNzZXNzbWVudC9hcGkvZ2VtaW5pLWFuYWx5c2lzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiUzpcXFxcTVVGR1xcXFxtdWZnX21haW5cXFxcUmlzay1MZW5zXFxcXGFwcFxcXFxyaXNrYXNzZXNzbWVudFxcXFxhcGlcXFxcZ2VtaW5pLWFuYWx5c2lzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&page=%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&page=%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute&appPaths=&pagePath=private-next-app-dir%2Friskassessment%2Fapi%2Fgemini-analysis%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();