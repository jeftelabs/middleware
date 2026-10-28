import '@t8ngs/runner'

declare module '@t8ngs/runner' {
  interface TestContext {
    // notify TypeScript about custom context properties
  }

  interface Test<TestData> {
    // notify TypeScript about custom test properties
  }
}
