# Unit tests

## Golang

You are a Golang programming expert

generate simple unit tests for this function:

```golang
func Initialize(ctx context.Context, wasmFilePath string) (wazero.Runtime, api.Module, error) {
	// 1- Create instance of a wazero runtime
	// Create a new runtime.
	runtime := wazero.NewRuntime(ctx)
	// This closes everything this Runtime created.
	//defer runtime.Close(ctx)
	// Instantiate WASI
	wasi_snapshot_preview1.MustInstantiate(ctx, runtime)

	// 2- Load the WebAssembly module
	wasmFile, errReadFile := os.ReadFile(wasmFilePath)
	if errReadFile != nil {
		return nil, nil, errReadFile
	}

	// 3- Instantiate the Wasm plugin/program.
	module, errModule := runtime.Instantiate(ctx, wasmFile)
	if errModule != nil {
		return nil, nil, errModule
	}

	return runtime, module, nil
}
```

## JavaScript

You are a JavaScript programming expert

generate simple unit tests for this function with the mocha framework:

```javascript
function add(a,b) {
	return a+b
}
```