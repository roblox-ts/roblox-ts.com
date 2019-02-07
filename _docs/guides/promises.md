---
title: Promises
order: 2
category: guides
description: Learn how to use roblox-ts-flavored Promises to model asynchronicity in your Roblox game.
---

roblox-ts supports
[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
as a first class citizen. Many TypeScript language features are built with
Promises in mind such as async functions and the `await` operator. Promises are
the preferred method of modelling asynchronicity in your game (as opposed to
yielding).

## How Promises Work

A Promise is an object that represents a value that will exist in the future, but
doesn't right now. Promises allow you to then attach callbacks that can run
once the value becomes available (known as *resolving*), or if an error has
occurred (known as *rejecting*).

```ts
function returnsAPromise(): Promise<string> {
  return new Promise((resolve, reject) => {
    spawn(() => {
      wait(5);
      resolve("foo");
    })
  });
}

// Prints: `Resolved with foo!` after 5 seconds
returnsAPromise().then(str => print(`Resolved with ${str}!`))
```

## Promises over Yielding

The way Roblox models asynchronous operations by default is by yielding
(stopping) the thread and then resuming it when the future value is available.
This is an anti-pattern for numerous reasons:

- Functions you call can yield without warning, or only yield sometimes, leading
  to unpredictable and surprising results. Accidentally yielding the thread is
  the source of a large class of bugs that Roblox developers run into.
- It is difficult to deal with running multiple asynchronous operations
  concurrently and then retrieve all of their values at the end without
  extraneous machinery.
- When an asynchronous operation fails or an error is encountered, Lua functions
  usually either raise an error or return a success value followed by the actual
  value. Both of these methods lead to repeating the same tired patterns many
  times over for checking if the operation was successful.
- Yielding lacks easy access to introspection and the ability to cancel an
  operation if the value is no longer needed.

## Cancellation

Promises are cancellable, but abort semantics are optional. This means that if
you cancel a Promise, it will *never* resolve or reject, even if the function is
still working in the background. But you can also optionally add a cancellation
hook in the Promise to abort any ongoing operations:

```ts
function returnsACancellablePromise(seconds: number): Promise<string> {
  return new Promise((resolve, reject, onCancel) => {
    spawn(() => {
      let cancelled = false;

      // Call `onCancel` with a function. Passed function is called if Promise is cancelled.
      onCancel(() => (cancelled = true));

      for (let i = 0; i < seconds; i++) {
        if (cancelled) {
          break;
        }

        print(`${seconds - i} seconds left...`);
        wait(1);
      }
      
      resolve("foo"); // Ignored if the Promise is cancelled!
    })
  });
}

const promise = returnsACancellablePromise()
  .then(() => print("This is never called, because it's cancelled below!"))
  .catch(() => print("This is called if an error were to occur!"))
  .finally(() => print("`finally` is always called at the end, regardless!"));

wait(5);

promise.cancel();
// Prints: "`finally` is always called at the end, regardless!"
```

This cancellation pattern is modelled after [Bluebird's cancellation feature](http://bluebirdjs.com/docs/api/cancellation.html).

### Cancellation timing
If a Promise is already cancelled at the time of calling its onCancel hook, the
hook will be called immediately.

If you attach a `.then` or `.catch` handler to a Promise after it's been
cancelled, the chained Promise will be instantly rejected with the error
"Promise is cancelled".

If you cancel a Promise immediately after creating it in the same Lua cycle, the
fate of the Promise is dependent on if the Promise handler yields or not. If the
Promise handler resolves without yielding, then the Promise will already be
settled by the time you are able to cancel it, thus any consumers of the Promise
will have already been called. If the Promise does yield, then cancelling it
immediately *will* prevent its resolution.

Attempting to cancel an already-settled Promise is ignored, but this may change
to throw an error in the future.

### Cancellation propagation
When you cancel a Promise, the cancellation propagates up the Promise chain.
Promises keep track of the number of consumers that they have, and when the
upwards propagation encounters a Promise that no longer has any consumers, that
Promise is cancelled as well.

It's important to note that cancellation does **not** propagate downstream, so
if you get a handle to a Promise earlier in the chain and cancel it directly,
Promises that are consuming the cancelled Promise will remain in an unsettled
state forever.

## Async Functions and `await`

Async functions make it easy to create functions that return Promises. Async
functions are just like regular functions, except whatever you return from them
is automatically wrapped in a Promise. Further, when you call the function, it
always instantly returns a Promise, even if you yield inside the function body.
The returned Promise is resolved with whatever value you end up returning from
the function.

```ts
async function example(): Promise<string> {
  wait(5);
  return "foo";
}

example().then(print); // prints "foo" after 5 seconds
print("This is printed first, because it isn't blocked by yielding!");
```

You can also use the special `await` operator only inside async functions, which
lets you yield in a safe way. The `await` operator accepts a Promise, and yields
until the promise is resolved.

```ts
async function usesAwait(): Promise<void> {
  const value = await example(); // value is set to "foo" after 5 seconds

  print(value); // prints "foo"
}

usesAwait().then(() => print("All done!"));
```

# API Reference
## new Promise
Creates a new Promise. Accepts one parameter: a callback used to initialize the promise. This callback is passed a resolve callback used resolve the promise with a value or the result of another promise, a reject callback used to reject the promise with a provided reason or error, and an onCancel function which may be used to register a cancellation hook by calling it with a function which will be called if the Promise is cancelled, allowing you to implement abort semantics.

## Promise.resolve
Creates an immediately resolved Promise with the given value.

## Promise.reject
Creates an immediately rejected Promise with the given value.

## Promise.all
Accepts an array of Promises and returns a new Promise that is resolved when all
input Promises resolve, or rejects if any of the input Promises reject.

## promise.then
Attaches callbacks for the resolution and/or rejection of the Promise. Accepts
two parameters: The callback to execute when the Promise is resolved, and The
callback to execute when the Promise is rejected.

Returns a chained Promise.

## promise.catch
Attaches a callback for only the rejection of the Promise.

## promise.finally
Attaches a callback to always run when this Promise settles, regardless of its
fate.

The callback runs when the Promise is resolved, rejected, or cancelled.

## promise.cancel
Cancels the promise, which also calls its onCancel hook. Accepts and returns no values.

## promise.isRejected
Returns true if this Promise has been rejected.

## promise.isResolved
Returns true if this Promise has been resolved.

## promise.isCancelled
Returns true if this Promise has been cancelled.

## promise.isPending
Returns true if this Promise is still pending.