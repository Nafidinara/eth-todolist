const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
    before(async () => {
        this.todoList = await TodoList.deployed();
    })
    it('deploys successfully', async () => {
        const address = await this.todoList.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, ' ')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })
    it('list tasks', async () => {
      const taskCount = await this.todoList.taskCount()
      const task = await this.todoList.tasks(taskCount)
      assert.equal(task.id.toNumber(), taskCount.toNumber())
      assert.equal(task.content, "Tuntaskan materi blockchain fundamental")
      assert.equal(task.completed, false)
      assert.equal(taskCount.toNumber(), 1)
    })
    it('created tasks', async () => {
        const item = await this.todoList.createTask('Task baru')
        const taskCount = await this.todoList.taskCount()
        assert.equal(taskCount,2)

        const event = item.logs[0].args
        assert.equal(event.id.toNumber(), 2)
        assert.equal(event.content, 'Task baru')
        assert.equal(event.completed, false)
    });
})
