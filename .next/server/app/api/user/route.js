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
exports.id = "app/api/user/route";
exports.ids = ["app/api/user/route"];
exports.modules = {

/***/ "(rsc)/./app/api/user/route.ts":
/*!*******************************!*\
  !*** ./app/api/user/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function GET(req) {\n    try {\n        const authHeader = req.headers.get(\"authorization\");\n        if (!authHeader) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"No auth token\"\n        }, {\n            status: 401\n        });\n        const token = authHeader.split(\" \")[1];\n        if (!token) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Invalid token\"\n        }, {\n            status: 401\n        });\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, process.env.JWT_SECRET);\n        if (!decoded?.userId) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Invalid token\"\n        }, {\n            status: 401\n        });\n        // Fetch user using Prisma\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                id: decoded.userId\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                createdAt: true\n            }\n        });\n        if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"User not found\"\n        }, {\n            status: 404\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            user\n        });\n    } catch (err) {\n        console.error(err);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Server error\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VzZXIvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDbEI7QUFDUDtBQUV4QixlQUFlRyxJQUFJQyxHQUFnQjtJQUN4QyxJQUFJO1FBQ0YsTUFBTUMsYUFBYUQsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUM7UUFDbkMsSUFBSSxDQUFDRixZQUNILE9BQU9MLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUV2RSxNQUFNQyxRQUFRTixXQUFXTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEMsSUFBSSxDQUFDRCxPQUNILE9BQU9YLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFnQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUV2RSxNQUFNRyxVQUFlWCwwREFBVSxDQUFDUyxPQUFPSSxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFFN0QsSUFBSSxDQUFDSixTQUFTSyxRQUNaLE9BQU9sQixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBZ0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7UUFFdkUsMEJBQTBCO1FBQzFCLE1BQU1TLE9BQU8sTUFBTWxCLCtDQUFNQSxDQUFDa0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDeENDLE9BQU87Z0JBQUVDLElBQUlULFFBQVFLLE1BQU07WUFBQztZQUM1QkssUUFBUTtnQkFDTkQsSUFBSTtnQkFDSkUsTUFBTTtnQkFDTkMsT0FBTztnQkFDUEMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxJQUFJLENBQUNQLE1BQ0gsT0FBT25CLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtRQUV4RSxPQUFPVixxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO1lBQUVXO1FBQUs7SUFDbEMsRUFBRSxPQUFPUSxLQUFVO1FBQ2pCQyxRQUFRQyxLQUFLLENBQUNGO1FBQ2QsT0FBTzNCLHFEQUFZQSxDQUFDUSxJQUFJLENBQUM7WUFBRUMsU0FBUztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3RFO0FBQ0YiLCJzb3VyY2VzIjpbIlM6XFxNVUZHXFxtdWZnX21haW5cXFJpc2stTGVuc1xcYXBwXFxhcGlcXHVzZXJcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxOiBOZXh0UmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KFwiYXV0aG9yaXphdGlvblwiKTtcclxuICAgIGlmICghYXV0aEhlYWRlcilcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJObyBhdXRoIHRva2VuXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuXHJcbiAgICBjb25zdCB0b2tlbiA9IGF1dGhIZWFkZXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgaWYgKCF0b2tlbilcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZTogXCJJbnZhbGlkIHRva2VuXCIgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuXHJcbiAgICBjb25zdCBkZWNvZGVkOiBhbnkgPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUISk7XHJcblxyXG4gICAgaWYgKCFkZWNvZGVkPy51c2VySWQpXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCB0b2tlblwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcblxyXG4gICAgLy8gRmV0Y2ggdXNlciB1c2luZyBQcmlzbWFcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IGRlY29kZWQudXNlcklkIH0sXHJcbiAgICAgIHNlbGVjdDoge1xyXG4gICAgICAgIGlkOiB0cnVlLFxyXG4gICAgICAgIG5hbWU6IHRydWUsXHJcbiAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF1c2VyKVxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSwgeyBzdGF0dXM6IDQwNCB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB1c2VyIH0pO1xyXG4gIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBlcnJvclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJqd3QiLCJHRVQiLCJyZXEiLCJhdXRoSGVhZGVyIiwiaGVhZGVycyIsImdldCIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwidG9rZW4iLCJzcGxpdCIsImRlY29kZWQiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsInVzZXJJZCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsInNlbGVjdCIsIm5hbWUiLCJlbWFpbCIsImNyZWF0ZWRBdCIsImVyciIsImNvbnNvbGUiLCJlcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/user/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUV2QyxNQUFNQyxTQUFTLElBQUlELHdEQUFZQSxHQUFHIiwic291cmNlcyI6WyJTOlxcTVVGR1xcbXVmZ19tYWluXFxSaXNrLUxlbnNcXGxpYlxccHJpc21hLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IG5ldyBQcmlzbWFDbGllbnQoKTtcclxuIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsInByaXNtYSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var S_MUFG_mufg_main_Risk_Lens_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/user/route.ts */ \"(rsc)/./app/api/user/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/user/route\",\n        pathname: \"/api/user\",\n        filename: \"route\",\n        bundlePath: \"app/api/user/route\"\n    },\n    resolvedPagePath: \"S:\\\\MUFG\\\\mufg_main\\\\Risk-Lens\\\\app\\\\api\\\\user\\\\route.ts\",\n    nextConfigOutput,\n    userland: S_MUFG_mufg_main_Risk_Lens_app_api_user_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1c2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ1c2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdXNlciUyRnJvdXRlLnRzJmFwcERpcj1TJTNBJTVDTVVGRyU1Q211ZmdfbWFpbiU1Q1Jpc2stTGVucyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9UyUzQSU1Q01VRkclNUNtdWZnX21haW4lNUNSaXNrLUxlbnMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ1E7QUFDckY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIlM6XFxcXE1VRkdcXFxcbXVmZ19tYWluXFxcXFJpc2stTGVuc1xcXFxhcHBcXFxcYXBpXFxcXHVzZXJcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3VzZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS91c2VyXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91c2VyL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiUzpcXFxcTVVGR1xcXFxtdWZnX21haW5cXFxcUmlzay1MZW5zXFxcXGFwcFxcXFxhcGlcXFxcdXNlclxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fuser%2Froute&page=%2Fapi%2Fuser%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fuser%2Froute.ts&appDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=S%3A%5CMUFG%5Cmufg_main%5CRisk-Lens&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();