---
layout: post
tags:   ["TypeScript"]
title:  "[TypeScript] JSON物件轉TypeScript物件範例"
---


##Playground##

- [**http://tinyurl.com/nv4x9ak**](http://tinyurl.com/nv4x9ak)


##Samples##


	class DataTable {
	
	    public columns: Array<string>;
	
	    public rows: Array<DataRow>;
	}
	
	class DataRow {
	
	    public cells: Array<string>;
	}
	
	class Test {
	
	    public jsonObject =
	    {
	        "columns": ["ColumnA", "ColumnB", "ColumnC"],
	        "rows":
	        [
	            { "cells": ["A1", "B1", "C1"] },
	            { "cells": ["A2", "B2", "C2"] }
	        ]
	    };
	
	    public run() {
	        var x = (<DataTable>this.jsonObject);
	        x.columns.push("ColumnD");
	        alert(x.columns.length);
	    }
	}
	
	var test = new Test();
	test.run();
