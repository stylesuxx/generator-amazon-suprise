# generator-amazon-surprise
>Generator that generates an amazon surprise bot

## Installation
Install the generator globally:

    sudo npm install generator-amazon-surprise -g

## Usage
To invoke the generator create a directory for the generator and run it:

    mkdir generator-amazon-surprise
    yo amazon-surprise

## Todo's
* [x] Filter out items that are already in the history
* [x] Filter items by price
* [x] Add test for utils
* [x] Refactor utils to plain utils and to a seperate bot file
* [ ] Display information about how to best configure Amazon
* [ ] Prompt for Amazon username and password (this should be in a seperte config which is ignored by git)
* [ ] Add functionality to order multiple parts till max price is reached
* [ ] Add weight to those items that have higher priority
* [ ] Add functionality to simulate an order

## [MIT](https://opensource.org/licenses/MIT) License
Copyright (c) 2015 Chris Landa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
