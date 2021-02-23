"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MockFemaCapgen = void 0;
var capgen_1 = require("capgen");
var MockFemaObj = {
    Signature: {
        SignedInfo: {
            CanonicalizationMethod: {
                Algorithm: ""
            }
        }
    }
};
var MockFemaCapgen = /** @class */ (function (_super) {
    __extends(MockFemaCapgen, _super);
    function MockFemaCapgen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockFemaCapgen.prototype.createUsing = function (femaCapJson) {
        var capJsonObject = {
            identifier: femaCapJson.identifier,
            sender: femaCapJson.sender,
            sent: femaCapJson.sent,
            status: femaCapJson.status,
            msgType: femaCapJson.msgType,
            scope: femaCapJson.scope,
            source: femaCapJson.source,
            addresses: femaCapJson.addresses,
            code: femaCapJson.code,
            note: femaCapJson.note,
            references: femaCapJson.references,
            incidents: femaCapJson.incidents,
            info: femaCapJson.info
        };
        var basicCap = _super.prototype.createUsing.call(this, capJsonObject);
        return "";
    };
    return MockFemaCapgen;
}(capgen_1.Capgen));
exports.MockFemaCapgen = MockFemaCapgen;
