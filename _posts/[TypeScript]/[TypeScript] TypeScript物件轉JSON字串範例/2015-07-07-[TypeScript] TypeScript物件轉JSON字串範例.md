---
layout: post
tags:   ["TypeScript"]
title:  "[TypeScript] JSON物件轉TypeScript物件範例"
---

#[TypeScript] TypeScript物件轉JSON字串範例#


##Playground##

- [**http://tinyurl.com/njbrnrv**](http://tinyurl.com/njbrnrv)


##Samples##
	
	class DataTable {
	
	    public columns: Array<string> = new Array<string>();
	
	    public rows: Array<DataRow> = new Array<DataRow>();
	}
	
	class DataRow {
	
	    public cells: Array<string> = new Array<string>();
	}
	
	class Test {
	        
	    public run() {
	
	        var table = new DataTable();
	        table.columns.push("ColumnA");
	        table.columns.push("ColumnB");
	        table.columns.push("ColumnC");
	
	        var row1 = new DataRow();
	        row1.cells.push("A1");
	        row1.cells.push("B1");
	        row1.cells.push("C1");
	        table.rows.push(row1);
	
	        var row2 = new DataRow();
	        row2.cells.push("A2");
	        row2.cells.push("B2");
	        row2.cells.push("C2");
	        table.rows.push(row2);
	
	        alert(JSON.stringify(table));
	    }
	}
	
	var test = new Test();
	test.run();