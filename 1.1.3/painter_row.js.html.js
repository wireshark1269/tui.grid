tui.util.defineNamespace("fedoc.content", {});
fedoc.content["painter_row.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Row Painter 정의\n * @author NHN Ent. FE Development Team\n */\n'use strict';\n\nvar Painter = require('../base/painter');\nvar util = require('../common/util');\n\n/**\n * Row Painter\n * 성능 향상을 위해 Row Painter 를 위한 클래스 생성\n * @module painter/row\n * @extends module:base/painter\n */\nvar RowPainter = tui.util.defineClass(Painter, /**@lends module:painter/row.prototype */{\n    /**\n     * @constructs\n     * @param {object} options - Options\n     *      @param {string} [options.whichSide='R']   어느 영역에 속하는 row 인지 여부. 'L|R' 중 하나를 지정한다.\n     *      @param {object} options.collection change 를 감지할 collection 객체\n     */\n    init: function(options) {\n        Painter.apply(this, arguments);\n        this.painterManager = options.painterManager;\n    },\n\n    template: _.template(\n        '&lt;tr ' +\n        'key=\"&lt;%=key%>\" ' +\n        'class=\"&lt;%=className%>\" ' +\n        'style=\"height: &lt;%=height%>px;\">' +\n        '&lt;%=contents%>' +\n        '&lt;/tr>'\n    ),\n\n    /**\n     * model 변경 시 이벤트 핸들러\n     * @param {object} changed - 변화가 일어난 모델 인스턴스\n     * @param {jQuery} $tr - jquery object for tr element\n     */\n    onModelChange: function(changed, $tr) {\n        _.each(changed, function(cellData, columnName) {\n            var editType, cellPainter;\n\n            if (columnName !== '_extraData') {\n                editType = this._getEditType(columnName, cellData);\n                cellPainter = this.painterManager.getCellPainter(editType);\n                cellPainter.onModelChange(cellData, $tr);\n            }\n        }, this);\n    },\n\n    /**\n     * cellData 의 isEditable 프로퍼티에 따른 editType 을 반환한다.\n     * editable 프로퍼티가 false 라면 normal type 으로 설정한다.\n     * @param {string} columnName 컬럼명\n     * @param {Object} cellData 셀 데이터\n     * @returns {string} cellFactory 에서 사용될 editType\n     * @private\n     */\n    _getEditType: function(columnName, cellData) {\n        var editType = this.grid.columnModel.getEditType(columnName);\n        if (!cellData.isEditable &amp;&amp; columnName !== '_number') {\n            editType = 'normal';\n        }\n        return editType;\n    },\n\n    /**\n     * Returns the HTML string of all cells in Dummy row.\n     * @param  {Array.&lt;Object>} columnModelList- Column model list\n     * @returns {String} HTLM string\n     * @private\n     */\n    _getHtmlForDummyRow: function(columnModelList) {\n        var cellPainter = this.painterManager.getCellPainter('dummy'),\n            html = '';\n\n        _.each(columnModelList, function(columnModel) {\n            html += cellPainter.getHtml(columnModel.columnName);\n        });\n        return html;\n    },\n\n    /**\n     * Returns the HTML string of all cells in Actual row.\n     * @param  {module:model/row} model - View model instance\n     * @param  {Array.&lt;Object>} columnModelList - Column model list\n     * @returns {String} HTLM string\n     * @private\n     */\n    _getHtmlForActualRow: function(model, columnModelList) {\n        var html = '';\n\n        _.each(columnModelList, function(columnModel) {\n            var columnName = columnModel.columnName,\n                cellData = model.get(columnName),\n                editType, cellPainter;\n\n            if (cellData &amp;&amp; cellData.isMainRow) {\n                editType = this._getEditType(columnName, cellData);\n                cellPainter = this.painterManager.getCellPainter(editType);\n                html += cellPainter.getHtml(cellData);\n            }\n        }, this);\n        return html;\n    },\n\n    /**\n     * Returns the HTML string of all cells in the given model (row).\n     * @param  {module:model/row} model - View model instance\n     * @param  {Array.&lt;Object>} columnModelList - Column model list\n     * @returns {String} HTLM string\n     */\n    getHtml: function(model, columnModelList) {\n        var rowKey = model.get('rowKey'),\n            html;\n\n        if (_.isUndefined(rowKey)) {\n            html = this._getHtmlForDummyRow(columnModelList);\n        } else {\n            html = this._getHtmlForActualRow(model, columnModelList);\n        }\n\n        return this.template({\n            key: rowKey,\n            height: this.grid.dimensionModel.get('rowHeight') + RowPainter._extraHeight,\n            contents: html,\n            className: ''\n        });\n    },\n\n    static: {\n        /**\n         * IE7에서만 TD의 border만큼 높이가 늘어나는 버그에 대한 예외처리를 위한 값\n         * @memberof RowPainter\n         * @static\n         */\n        _extraHeight: (function() {\n            var value = 0;\n            if (util.isBrowserIE7()) {\n                // css에서 IE7에 대해서만 padding의 높이를 위아래 1px씩 주고 있음 (border가 생겼을 때는 0)\n                value = -2;\n            }\n            return value;\n        })()\n    }\n});\n\nmodule.exports = RowPainter;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"