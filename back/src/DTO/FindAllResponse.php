<?php

namespace App\DTO;

use App\Document\Task;

class FindAllResponse
{

    /**
    @var Task[]
     */
    private $todosList;
    private int $totalLength;

    public function __construct()
    {
        $this->todosList = [];
        $this->length = 0;
    }

    // getter and setter for todosList and length
    public function getTodosList():array
    {
        return $this->todosList;
    }

    public function getTotalLength():int
    {
        return $this->length;
    }

    public function setTodosList(array $todosList):self
    {
        $this->todosList = $todosList;
        return $this;
    }

    public function setTotalLength(int $length):self
    {
        $this->length = $length;
        return $this;
    }
}