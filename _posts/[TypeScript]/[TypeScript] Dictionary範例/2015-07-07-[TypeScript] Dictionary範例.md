---
layout: post
tags:   ["TypeScript"]
title:  "[TypeScript] Dictionary範例"
---


##Playground##

- [**http://tinyurl.com/o7czcxo**](http://tinyurl.com/o7czcxo)


##Samples##

	class Dictionary {
	    [index: string]: string;
	}
	
	class Test {
	
	    public run() {
	        var parameters = new Dictionary();
	        parameters["A"] = "A01";
	        parameters["B"] = "B01";
	        parameters["C"] = "C01";
	
	        for (var key in parameters) {
	            alert(
	                "key=" + key + "\n" +
	                "value=" + parameters[key] + "\n"
	                );
	        }
	    }
	}
	
	var test = new Test();
	test.run();