import { userService } from '../_services';

describe("splitMessage function", () => {
  test("it should output message as input message when input message has length <= 50", () => {
    const input = "I am the first test";
    const output = ["I am the first test"];
    expect(userService.splitMessage(input)).toEqual(output);
  });
  test("it should output messages with 50 characters limited length when input message has length > 50", () =>{
    const input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
    const output = ["1/2 I can't believe Tweeter now supports chunking my", "2/2 messages, so I don't have to do it myself."];
    expect(userService.splitMessage(input)).toEqual(output);
  });
  test("it should output empty array when input message is empty", () =>{
    const input = "             ";
    const output = [];
    expect(userService.splitMessage(input)).toEqual(output);
  });
  test("it should output messages with 50 characters limited length when input message has length > 50 and many consecutive whitespaces", () =>{
    const input = "I can't believe Tweeter now supports                 chunking my messages, so I don't have to do it myself."
    const output = ["1/3 I can't believe Tweeter now supports              ", "2/3   chunking my messages, so I don't have to do it", "3/3 myself."];
    expect(userService.splitMessage(input)).toEqual(output);
  });
  test("it should output 1 message with  50 characters length when input message has length = 51 and last character is whitespace", () =>{
    const input = "I can't believe Tweeter now supports chunking my m "
    const output = ["I can't believe Tweeter now supports chunking my m"];
    expect(userService.splitMessage(input)).toEqual(output);
  });
});
