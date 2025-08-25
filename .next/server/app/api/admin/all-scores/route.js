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
exports.id = "app/api/admin/all-scores/route";
exports.ids = ["app/api/admin/all-scores/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/all-scores/route.ts":
/*!*******************************************!*\
  !*** ./app/api/admin/all-scores/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(req) {\n    try {\n        const authHeader = req.headers.get(\"authorization\");\n        if (!authHeader) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"No token provided\"\n            }, {\n                status: 401\n            });\n        }\n        const token = authHeader.split(\" \")[1];\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Invalid token format\"\n            }, {\n                status: 401\n            });\n        }\n        let decoded;\n        try {\n            decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET || \"supersecretkey123\");\n        } catch (err) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Invalid or expired token\"\n            }, {\n                status: 401\n            });\n        }\n        if (!decoded || decoded.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Forbidden: Admins only\"\n            }, {\n                status: 403\n            });\n        }\n        // Fetch all risk scores with user info\n        const scores = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.riskScore.findMany({\n            include: {\n                user: true\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            scores\n        });\n    } catch (err) {\n        console.error(\"API Error:\", err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: err.message || \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL2FsbC1zY29yZXMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDbEI7QUFDUDtBQUV4QixlQUFlRyxJQUFJQyxHQUFnQjtJQUN4QyxJQUFJO1FBQ0YsTUFBTUMsYUFBYUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxDQUFDRixZQUFZO1lBQ2YsT0FBT0wscURBQVlBLENBQUNRLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBb0IsR0FDL0I7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1DLFFBQVFOLFdBQVdPLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0QyxJQUFJLENBQUNELE9BQU87WUFDVixPQUFPWCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUF1QixHQUNsQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSUc7UUFDSixJQUFJO1lBQ0ZBLFVBQVVYLDBEQUFVLENBQUNTLE9BQU9JLFFBQVFDLEdBQUcsQ0FBQ0MsVUFBVSxJQUFJO1FBQ3hELEVBQUUsT0FBT0MsS0FBSztZQUNaLE9BQU9sQixxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtnQkFBRUMsU0FBUztZQUEyQixHQUN0QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSSxDQUFDRyxXQUFXQSxRQUFRTSxJQUFJLEtBQUssU0FBUztZQUN4QyxPQUFPbkIscURBQVlBLENBQUNRLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBeUIsR0FDcEM7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLHVDQUF1QztRQUN2QyxNQUFNVSxTQUFTLE1BQU1uQiwrQ0FBTUEsQ0FBQ29CLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDO1lBQzdDQyxTQUFTO2dCQUFFQyxNQUFNO1lBQUs7WUFDdEJDLFNBQVM7Z0JBQUVDLFdBQVc7WUFBTztRQUMvQjtRQUVBLE9BQU8xQixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVZO1FBQU87SUFDcEMsRUFBRSxPQUFPRixLQUFVO1FBQ2pCUyxRQUFRQyxLQUFLLENBQUMsY0FBY1Y7UUFDNUIsT0FBT2xCLHFEQUFZQSxDQUFDUSxJQUFJLENBQ3RCO1lBQUVDLFNBQVNTLElBQUlULE9BQU8sSUFBSTtRQUFlLEdBQ3pDO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJTOlxcTVVGR1xcbXVmZ19tYWluXFxSaXNrLUxlbnNcXGFwcFxcYXBpXFxhZG1pblxcYWxsLXNjb3Jlc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XHJcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IE5leHRSZXF1ZXN0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGF1dGhIZWFkZXIgPSByZXEuaGVhZGVycy5nZXQoXCJhdXRob3JpemF0aW9uXCIpO1xyXG4gICAgaWYgKCFhdXRoSGVhZGVyKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiTm8gdG9rZW4gcHJvdmlkZWRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRva2VuID0gYXV0aEhlYWRlci5zcGxpdChcIiBcIilbMV07XHJcbiAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiSW52YWxpZCB0b2tlbiBmb3JtYXRcIiB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDEgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWNvZGVkOiBhbnk7XHJcbiAgICB0cnkge1xyXG4gICAgICBkZWNvZGVkID0gand0LnZlcmlmeSh0b2tlbiwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCBcInN1cGVyc2VjcmV0a2V5MTIzXCIpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6IFwiSW52YWxpZCBvciBleHBpcmVkIHRva2VuXCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWRlY29kZWQgfHwgZGVjb2RlZC5yb2xlICE9PSBcImFkbWluXCIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogXCJGb3JiaWRkZW46IEFkbWlucyBvbmx5XCIgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGZXRjaCBhbGwgcmlzayBzY29yZXMgd2l0aCB1c2VyIGluZm9cclxuICAgIGNvbnN0IHNjb3JlcyA9IGF3YWl0IHByaXNtYS5yaXNrU2NvcmUuZmluZE1hbnkoe1xyXG4gICAgICBpbmNsdWRlOiB7IHVzZXI6IHRydWUgfSxcclxuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6IFwiZGVzY1wiIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzY29yZXMgfSk7XHJcbiAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJBUEkgRXJyb3I6XCIsIGVycik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHsgbWVzc2FnZTogZXJyLm1lc3NhZ2UgfHwgXCJTZXJ2ZXIgZXJyb3JcIiB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJHRVQiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwidG9rZW4iLCJzcGxpdCIsImRlY29kZWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImVyciIsInJvbGUiLCJzY29yZXMiLCJyaXNrU2NvcmUiLCJmaW5kTWFueSIsImluY2x1ZGUiLCJ1c2VyIiwib3JkZXJCeSIsImNyZWF0ZWRBdCIsImNvbnNvbGUiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/all-scores/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUV2QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQSxHQUFHIiwic291cmNlcyI6WyJTOlxcTVVGR1xcbXVmZ19tYWluXFxSaXNrLUxlbnNcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fall-scores%2Froute&page=%2Fapi%2Fadmin%2Fall-scores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fall-scores%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fall-scores%2Froute&page=%2Fapi%2Fadmin%2Fall-scores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fall-scores%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var S_MUFG_mufg_main_Risk_Lens_app_api_admin_all_scores_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/all-scores/route.ts */ \"(rsc)/./app/api/admin/all-scores/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/all-scores/route\",\n        pathname: \"/api/admin/all-scores\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/all-scores/route\"\n    },\n    resolvedPagePath: \"S:\\\\MUFG\\\\mufg_main\\\\Risk-Lens\\\\app\\\\api\\\\admin\\\\all-scores\\\\route.ts\",\n    nextConfigOutput,\n    userland: S_MUFG_mufg_main_Risk_Lens_app_api_admin_all_scores_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFsbC1zY29yZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGYWxsLXNjb3JlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGYWxsLXNjb3JlcyUyRnJvdXRlLnRzJmFwcERpcj1TJTNBJTVDTVVGRyU1Q211ZmdfbWFpbiU1Q1Jpc2stTGVucyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9UyUzQSU1Q01VRkclNUNtdWZnX21haW4lNUNSaXNrLUxlbnMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3FCO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJTOlxcXFxNVUZHXFxcXG11ZmdfbWFpblxcXFxSaXNrLUxlbnNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxhbGwtc2NvcmVzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9hbGwtc2NvcmVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vYWxsLXNjb3Jlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vYWxsLXNjb3Jlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIlM6XFxcXE1VRkdcXFxcbXVmZ19tYWluXFxcXFJpc2stTGVuc1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXGFsbC1zY29yZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fall-scores%2Froute&page=%2Fapi%2Fadmin%2Fall-scores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fall-scores%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

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

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fall-scores%2Froute&page=%2Fapi%2Fadmin%2Fall-scores%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fall-scores%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();